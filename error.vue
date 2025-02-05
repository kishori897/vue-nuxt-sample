<template>
  <div :class="$style.Error" class="w-full">
    <make-it-pop>
      <div class="flex justify-center h-8 mb-6">
        <company-logo class="max-w-lg w-full" />
      </div>

      <IslandContainer class="max-w-lg w-full">
        <template v-if="props.error?.statusCode === 401">
          <h1 class="mb-2 text-2xl">🛑 No entry</h1>
          <p>
            It seems like you're not allowed to access this page. If you feel
            like this is a mistake, please get in contact with support.
          </p>
        </template>

        <template v-else-if="props.error?.statusCode === 403">
          <h1 class="mb-2 text-2xl">Authentication not found</h1>
          <p>
            The user is not authenticated. If you feel like this is a mistake,
            please get in contact with support.
          </p>
        </template>

        <template v-else-if="props.error?.statusCode === 404">
          <h1 class="mb-2 text-2xl">Page not found</h1>
          <p>
            That page doesn't exist. If you feel like this is a mistake, please
            get in contact with support.
          </p>
        </template>

        <template v-else-if="props.error?.statusCode === 406">
          <h1 class="mb-2 text-2xl">Test not found</h1>
          <p>
            That test doesn't exist. If you feel like this is a mistake, please
            get in contact with support.
          </p>
        </template>

        <template v-else-if="props.error?.statusCode === 409">
          <h1 class="mb-2 text-2xl">✅ Application already submitted</h1>
          <p>
            This assessment has already been responded to. If you feel like this
            is a mistake, please get in contact with support.
          </p>
        </template>

        <template v-else-if="props.error?.statusCode === 410">
          <h1 class="mb-2 text-2xl">⏰ Application expired</h1>
          <p>
            This assessment has expired. If you feel this is a mistake please
            contact
            <a
              href="mailto:
            support@shortlister.com"
              >Support</a
            >
          </p>
        </template>

        <template v-else-if="props.error?.statusCode < 500">
          <h1 class="mb-2 text-2xl">🔨 Oops... something has gone wrong</h1>
          <p>
            Sorry about this. Please get in touch with support and quote your
            email address. We have noted this error internally.
          </p>
          <pre
            class="mt-3 text-gray-600 text-xs"
          ><code>{{ props.error?.statusCode }}: {{ props.error?.message }}</code></pre>
        </template>

        <template v-else>
          <h1 class="mb-2 text-2xl">🔨 Oops... we've broken something</h1>
          <p>
            It looks like this is our fault. Please try again later or get in
            touch with support. We have noted this error internally.
          </p>
          <pre
            class="mt-3 text-gray-600 text-xs"
          ><code>{{ props.error?.statusCode }}: {{ props.error?.message }}</code></pre>
        </template>
      </IslandContainer>
    </make-it-pop>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: null,
  },
})

useHead({
  title: `${props.error?.statusCode} | ${props.error?.message}`,
})
</script>

<style module lang="postcss">
.Error {
  @apply flex flex-col items-center justify-center min-h-screen overflow-hidden;

  & pre {
    @apply leading-normal;

    white-space: pre-line;
  }
}
</style>
