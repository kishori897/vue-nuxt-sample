<template>
  <div>
    <div :class="$style.Error" class="shadow-l">
      <div
        class="max-w-lg w-full bg-white px-9 py-8 rounded-lg border-2 border-b-6 border-red-200 gap-2"
      >
        <h1 class="mb-2 text-3xl">🛑 Oops</h1>
        <h4 class="text-xl">
          {{ props.errMsg ?? "Something seems to have gone wrong." }}
        </h4>
        <a
          v-show="props.mail"
          style="color: #e83c46"
          href="mailto:support@shortlister.com"
        >
          Contact us</a
        >
        <h4 class="text-l mb-5">
          This could be temporary. Please try again in some time.
        </h4>
        <a
          class="h-max bg-gray-500 hover:bg-gray-800 my-4 text-white py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded-lg"
          @click="
            () =>
              reloadNuxtApp({
                path:
                  fullPathWithQueryParams ?? `${config.public.baseURL}/test`,
                force: true,
              })
          "
          >Refresh
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  errMsg: {
    type: String,
    default: "",
  },
  mail: {
    type: String,
    default: "",
  },
})
const config = useRuntimeConfig()
const route = useRoute()
const fullPathWithQueryParams = route.fullPath
</script>

<style module lang="postcss">
.Error {
  @apply flex flex-col items-center justify-center min-h-[80vh] overflow-hidden;

  & pre {
    @apply leading-normal;

    white-space: pre-line;
  }
}
</style>
