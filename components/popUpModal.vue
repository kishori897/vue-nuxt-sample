<template>
  <div id="app" class="h-[80vh] flex justify-center items-center">
    <div>
      <div
        class="min-w-[50vw] w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
      >
        <div>
          <div class="text-center px-3 pt-3 flex-auto justify-center">
            <div class="w-full flex items-center justify-center">
              <img width="200px" src="~/assets/teamwork/13.png" />
            </div>

            <div v-if="!authstore.loading">
              <h2 class="text-2xl font-bold py-4">{{ `Welcome!` }}</h2>
              <p class="text-md text-gray-500 px-8">
                {{ `This activity will be available for ` }}
                <b>{{
                  (authstore?.deadline ?? props?.timeUp)
                    ? props.timeUp
                    : "limited"
                }}</b>
                {{
                  ` for you
                                to complete. Its really important that you understand what information you're sharing
                                and how it may be used. Please review it `
                }}
                <a
                  href="https://shortlist.me/privacy/dataprocessor"
                  target="_blank"
                  >here</a
                >.
              </p>
            </div>
            <div v-else>
              <p class="text-l text-gray-500">
                {{ `Please wait while we confirm that it's you. ` }}
              </p>
              <p class="text-l text-gray-500 pb-4">
                {{
                  `This will
                                only take a
                                moment.`
                }}
              </p>
            </div>
          </div>
          <div
            class="p-3 mt-4 text-center space-x-4 md:block"
            :class="
              isChangingScreen ? `animate-pulse m-auto bg-blue text-center` : ``
            "
          >
            <button
              v-if="authstore.loading"
              disabled
              class="mb-2 md:mb-0 bg-[#ee7e84] px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-md hover:shadow-lg hover:bg-red-"
            >
              <span class="loader12" />
            </button>
            <button
              v-show="!authstore.loading"
              class="mb-2 md:mb-0 bg-[#E83C46] px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-md hover:shadow-lg hover:bg-red-400"
              @click.once="onSave"
            >
              Accept
            </button>
            <button
              v-show="!authstore.loading"
              class="mb-2 md:mb-0 border px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-slate-800 rounded-md hover:shadow-lg"
              @click="terminate"
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores"
import { compare_dates } from "~/utils/compare_date.js"

const queryParams = useRoute().query
const config = useRuntimeConfig()
const authstore = useAuthStore()
const route = useRouter()

const props = defineProps({
  deadline: {
    type: String,
    default: "",
  },
  timeup: {
    type: String,
    default: "",
  },
})
const emit = defineEmits(["selected"])

const timeString = ref(null)
const isChangingScreen = ref(false)

async function callAccept() {
  const { data } = await useFetch(
    `${config.public.baseURL}/api/jobs/${queryParams.job_id}/test/${queryParams.application_id}/accept`,
  )
  return data
}

async function recaller() {
  const innerQuery = useRoute().query
  const url = `${config.public.baseURL}/api/jobs/${innerQuery.job_id}/test?${innerQuery?.provider ? "provider=" + innerQuery?.provider + "&" : ""}token=${innerQuery.token}&email=${encodeURIComponent(innerQuery.email)}&application_id=${innerQuery.application_id}`
  const { data } = await useFetch(url)
  return data
}

async function callReFetchAuth() {
  const parsedResponse = await recaller()
  const data = parsedResponse._rawValue ?? parsedResponse.data

  if (parsedResponse && data) {
    authstore.testLink = data.data["invite-url"]
    authstore.deadline = data.data["deadline"]
    authstore.callback_url = data.data["callback_url"]
    authstore.companyLogo = data.data["logo"]
    return true
  } else {
    return false
  }
}

async function onSave() {
  authstore.started = true

  try {
    isChangingScreen.value = true

    authstore.loading = true

    const resAccept = await callAccept()
    if (resAccept) {
      const resAuth = await callReFetchAuth()
      if (resAuth == false) {
        throw new createError({
          statusCode: 401,
          statusMessage: "Could not fetch test data. Please try again later.",
          fatal: true,
        })
      } else {
        authstore.started = true
        emit("selected")
      }
    }
  } catch (err) {
    console.error("fetch error pop:", err)
    throw new createError({
      statusCode: 401,
      statusMessage: "Could not fetch test data. Please try again later.",
      fatal: true,
    })
  } finally {
    setTimeout(() => {
      authstore.loading = false
      isChangingScreen.value = false
    }, 1000)
  }
}

// OK: Handles Application decline API call
async function terminate() {
  isChangingScreen.value = true

  try {
    const { error } = await useFetch(
      `${config.public.baseURL}/api/jobs/${queryParams.job_id}/test/${queryParams.application_id}/decline`,
    )

    if (error) {
      console.error("Could not complete Decline API call.", error)
    }

    // authstore.onWithdraw = false;
    route.push({ path: "/withdraw" })

    isChangingScreen.value = false
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  // authstore.onWithdraw = false;

  const difference = compare_dates(
    authstore.deadline ? authstore.deadline : props.deadline,
  )

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
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

a {
  text-decoration: underline;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 500ms ease-out;
}
</style>
async async
