<template>
  <div class="outer-div rounded-md">
    <div class="inner-div">
      <errorFallback
        v-if="isErrorLoadingUrl"
        err-msg="Please try again"
        mail="support@shortlister.com"
      />
      <object
        v-else
        id="embeddedContent"
        type="text/html"
        :data="props.frameUrl ?? authstore?.testLink"
        class="w-full h-full shadow-l border rounded-md"
      />
      <div v-show="!computedError" class="loader" />
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "~/stores"

const props = defineProps({
  frameUrl: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
})
const authstore = useAuthStore()

const isErrorLoadingUrl = ref(false)
const isLoading = ref(true)
let computedError

onMounted(() => {
  // Save the original fetch function
  const originalFetch = window.fetch

  // Override the global fetch function
  window.fetch = (...args) => {
    console.debug("Fetch request made:", args)
    return originalFetch(...args) // Call the original fetch function with the same arguments
  }

  computedError = computed(() => {
    return isErrorLoadingUrl.value || props.error
  })
  if (props?.error) {
    document.getElementsByClassName("loader")[0].style.display = "none"
    isErrorLoadingUrl.value = true
  }
  const obj = document.getElementById("embeddedContent")

  function onLoadHandler() {
    document.getElementsByClassName("loader")[0].style.display = "none"
    isLoading.value = false
    isErrorLoadingUrl.value = false
    try {
      // const tempVal = obj?.contentWindow?.document?.getElementsByClassName("print")[0] ?? null;
    } catch (error) {
      console.error("error ", error)
    }
    console.debug(
      "send callback url to POST message : ",
      authstore.callback_url,
    )
    // Send a message to the object's content
    obj.contentWindow.postMessage(`${authstore.callback_url}`, "*")
  }

  function onErrorHandler(error) {
    console.error("Failed to load content:", error)
    document.getElementsByClassName("loader")[0].style.display = "none"
    isErrorLoadingUrl.value = true
    isLoading.value = false
  }

  obj.addEventListener("load", onLoadHandler)
  obj.addEventListener("error", onErrorHandler)
})
</script>

<style scoped>
.outer-div {
  display: flex;
  position: relative;
  height: 75vh;
  align-items: center;
  justify-content: center;
}

.inner-div {
  width: 100%;
  height: 100%;
}

/* HTML: <div class="loader"></div> */
.loader {
  position: absolute;
  transform: translate (-50%, -50%);
  top: 50%;
  left: 50%;
  z-index: 1;
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #25b09b;
  --_m: conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
  mask: var(--_m);
  -webkit-mask-composite: source-out;
  mask-composite: subtract;
  animation: l3 1s infinite linear;
}

@keyframes l3 {
  to {
    transform: rotate(1turn);
  }
}
</style>
