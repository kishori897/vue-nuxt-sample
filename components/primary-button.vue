<template>
  <button :class="buttonClassName" :style="buttonTheme">
    <slot />
  </button>
</template>

<script setup lang="ts">
import colors from "tailwindcss/colors"

const $style = useCssModule()

const buttonClassName = computed(() => {
  return [$style.PrimaryButton]
})

const buttonTheme = computed(() => {
  return {
    "--bg": colors.red[400],
    "--bg-hover": colors.red[500],
    "--border": colors.red[500],
    "--border-hover": colors.red[600],
  }
})
</script>

<style module lang="postcss">
.PrimaryButton {
  @apply inline-flex justify-center;
  @apply border rounded-xl shadow-xl;
  @apply font-medium;
  @apply text-white no-underline;

  background-color: var(--bg) !important;
  border-color: var(--border) !important;
  white-space: nowrap;

  &:focus,
  &:active {
    @apply outline-none ring;
  }

  &:hover,
  &:active {
    background: var(--bg-hover) !important;
    border-color: var(--border-hover) !important;
  }

  &.Disabled,
  &[disabled] {
    @apply bg-gray-400 border-gray-400 opacity-30;
    @apply cursor-not-allowed pointer-events-none;
  }
}
</style>
