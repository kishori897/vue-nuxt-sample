<template>
  <div :class="$style.island_component">
    <slot />
  </div>
</template>

<style module lang="postcss">
.island_component {
  @apply p-6;
  @apply rounded-xl;
  @apply bg-white;

  @screen lg {
    @apply p-8;
  }
}
</style>
