<template>
  <PageContainer :class="$style.Lobby">
    <div>
      <div v-if="openModalNow">
        <PopUpModal
          :deadline="AuthDeadline"
          :time-up="timeString"
          @selected="handleModalOptionSelect"
        />
      </div>

      <div v-else>
        <header :class="$style.Header">
          <CompanyLogo :logo_url="companyLogo" />
          <InfoTip
            text-h-t-m-l="<p>Please print or download your results via the 'print these results' button before closing the test. They won't be accessible later.</p>"
          />
        </header>

        <!-- <transition name="fade" mode="out-in"> -->
        <main :class="$style.Grid">
          <div :class="$style.Recorder">
            <make-it-pop class="order-2 md:order-1">
              <IslandContainer>
                <IframeView :frame-url="testLink" :error="frameError" />
              </IslandContainer>
            </make-it-pop>
          </div>
        </main>
        <!-- </transition> -->
      </div>
    </div>
  </PageContainer>
</template>

<script setup>
import { z } from "zod"
import InfoTip from "../../components/infoTip.vue"
import { useAuthStore } from "../../stores"
import { compare_dates } from "../../utils/compare_date.js"

definePageMeta({
  layout: "auth",
  middleware: "assessment",
})

const config = useRuntimeConfig()

const queryfilter = z.object({
  application_id: z
    .string()
    .trim()
    .min(1, { message: "Invalid Application ID" }),
  email: z.string().trim().email().min(1, { message: "Invalid Email" }),
  job_id: z.string().trim().min(1, { message: "Invalid Job ID" }),
  provider: z.string().trim().optional(),
  token: z.string().trim().min(5, { message: "Invalid Token" }),
})

// Global store
const authstore = useAuthStore()

// Local reactive ref
const frameError = ref(false)
const testLink = ref(`${config.public.hostURL}/loader`)
const companyLogo = ref(null)
const openModalNow = ref(!authstore.started)
const queryParams = ref(null)
const AuthDeadline = ref(null)
const timeString = ref(null)

// Error handle
const isError = ref(false)
const errorCode = ref(200)
const errMessage = ref("")

watch(isError, (newValue, _) => {
  if (newValue === true) {
    throw createError({
      statusCode: errorCode.value,
      statusMessage: errMessage.value,
      fatal: true,
    })
  }
})

async function handleModalOptionSelect() {
  openModalNow.value = false
  testLink.value = authstore.testLink
}

function processDatesComaprision(deadline) {
  const difference = compare_dates(deadline)

  if (difference.days && difference.days > 0) {
    timeString.value = [
      difference.days
        ? `${difference.days} day${difference.days > 1 ? "s" : ""}`
        : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim()
  } else if (difference.hours && difference.hours > 0) {
    timeString.value = [
      difference.hours
        ? `${difference.hours} hr${difference.hours > 1 ? "s" : ""}`
        : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim()
  } else {
    timeString.value = [
      difference.minutes
        ? `${difference.minutes} min${difference.minutes > 1 ? "s" : ""}`
        : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim()
  }
}

;(() => {
  queryParams.value = useRoute().query
  const safeParseQuery = queryfilter.safeParse(queryParams.value)

  if (!safeParseQuery.success) {
    throw createError({
      statusCode: 401,
      statusMessage: "No entry",
    })
  }
})()

onMounted(async () => {
  // Save the original fetch function
  const originalFetch = window.fetch

  // Override the global fetch function
  window.fetch = (...args) => {
    console.debug("Fetch request made:", args) // Log the arguments passed to fetch
    return originalFetch(...args) // Call the original fetch function with the same arguments
  }

  /* -------------------------------------Stage 1: parse params and validate them ------------------------------------- */
  queryParams.value = useRoute().query
  const authstore = useAuthStore()

  try {
    authstore.loading = true

    /* -------------------------------------Stage 2: Call Auth API and check response ------------------------------------- */
    const response = await fetch(
      `${config.public.baseURL}/api/jobs/${queryParams.value.job_id}/test?${queryParams?.value?.provider ? "provider=" + queryParams?.value?.provider + "&" : ""}token=${queryParams.value.token}&email=${encodeURIComponent(queryParams.value.email)}&application_id=${queryParams.value.application_id}`,
    )
    const parsedResponse = await response.json()

    if (parsedResponse && (parsedResponse?.data["deadline"] ?? false)) {
      authstore.deadline = parsedResponse.data["deadline"]
      AuthDeadline.value = parsedResponse.data["deadline"]
      processDatesComaprision(parsedResponse.data["deadline"])
    }

    if (parsedResponse && (parsedResponse?.error ?? false)) {
      if (parsedResponse.error === "The test has expired.") {
        throw createError({
          statusCode: 410,
          statusMessage: "Your application has expired.",
        })
      }

      if (
        parsedResponse.error === "No test exist" ||
        parsedResponse.error === "No such test exist"
      ) {
        throw createError({
          statusCode: 406,
          statusMessage: "No test exist",
        })
      }

      if (
        parsedResponse.error ===
          "The user is not authenticated to access this test, Please enter right email" ||
        parsedResponse.error == "Token is not valid" ||
        (parsedResponse?.error.includes(
          "This application is not part of the provider",
        ) ??
          false)
      ) {
        throw createError({
          statusCode: 403,
          statusMessage: "No Entry",
        })
      }

      if (parsedResponse.error === "You haven't accepted to give the test") {
        return (authstore.started = false)
      }
    }

    /* -------------------------------------Stage 3: Enable View for Iframe ------------------------------------- */
    if (parsedResponse && (parsedResponse?.data["invite-url"] ?? false)) {
      testLink.value = parsedResponse.data["invite-url"]
      companyLogo.value = parsedResponse.data["logo"]

      authstore.testLink = parsedResponse.data["invite-url"]
      authstore.callback_url = parsedResponse.data["callback_url"]
      authstore.deadline = parsedResponse.data["deadline"]
      authstore.companyLogo = parsedResponse.data["logo"]

      AuthDeadline.value = parsedResponse.data["deadline"]
      processDatesComaprision(parsedResponse.data["deadline"])
      authstore.started = true
      openModalNow.value = false
    } else {
      frameError.value = true
    }

    if (parsedResponse?.status === "Invite URL generated") {
      authstore.started = true
    }
  } catch (err) {
    console.error("Fetch Error - ", err)

    switch (err.message) {
      case "Your application has expired.":
        isError.value = true
        errorCode.value = 410
        errMessage.value = "Your application has expired."
        break

      case "No test exist":
        isError.value = true
        errorCode.value = 406
        errMessage.value = "No test exist"
        break

      case "No Entry":
        isError.value = true
        errorCode.value = 403
        errMessage.value = "Unauthorised user"
        break

      case "You haven't accepted to give the test":
        authstore.started = false
        break

      case "Failed to fetch":
        isError.value = true
        errorCode.value = 401
        errMessage.value = "Could not get the test data."
        break

      default:
        break
    }

    frameError.value = true
  } finally {
    authstore.loading = false
  }
})
</script>

<style module lang="postcss">
.Lobby {
  @apply flex flex-wrap items-center;

  @apply mx-auto max-w-full xl:max-w-7xl gap-y-8;

  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  max-height: 100dvh;
  aspect-ratio: 4/3;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.Grid {
  @apply grid w-full h-full;

  grid-template-rows: 1fr auto;

  @screen md {
    grid-template-columns: auto 40%;
    grid-template-rows: 1fr 1rem;
  }
}

.Header {
  @apply mb-2 my-2 gap-y-8;
  display: flex;
  flex-direction: column;

  & h1 {
    line-height: 1.1;
  }

  @screen lg {
    max-width: 100%;
  }
}

.Recorder {
  @apply rounded-xl lg:rounded-3xl;
  @apply overflow-hidden;
  @apply bg-white;
  @apply shadow-2xl;

  position: relative;

  @screen md {
    grid-column: 1/3;
    grid-row: 1/2;
  }

  & video {
    position: absolute;
  }
}

.Duration {
  @apply grid items-center;
  @apply mb-8;

  & p {
    @apply text-lg leading-cozy text-gray-700;
  }

  @screen lg {
    @apply mb-6;

    grid-template-columns: 1fr auto;

    & p {
      @apply text-base leading-cozy;
    }
  }
}

.Accept {
  & a {
    @apply w-full;
  }
}

.About,
.Explainer {
  & img {
    @apply mb-4 rounded-lg;
  }

  & h2,
  & h3 {
    @apply text-xl;
  }

  & h2 {
    @apply mt-4 mb-0 leading-tight;
  }

  & p {
    @apply mt-4;
    @apply text-sm leading-normal;
  }
}

.About {
  @apply mb-6;
  @apply border-t border-gray-200;
}

.Explainer {
  @screen md {
    @apply top-8;

    position: sticky;
    align-self: flex-start;
  }
}
</style>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
