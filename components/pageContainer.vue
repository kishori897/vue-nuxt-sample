<template>
  <div :class="$style.page_component">
    <slot />
  </div>
</template>

<style module lang="postcss">
.page_component {
  @apply relative z-0;
  @apply px-6 py-8;

  @screen lg {
    @apply p-10;
  }

  @screen xl {
    @apply p-12;
  }
}
</style>
