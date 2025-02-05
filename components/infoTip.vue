<script setup lang="ts">
import { defineProps } from "vue"
import DOMPurify from "dompurify"

// Define the props with explicit types
const props = defineProps<{
  textHTML: string
}>()

function sanitizedHtml(html: string) {
  return DOMPurify.sanitize(html)
}
</script>

<template>
  <div :class="$style.Notice">
    <div class="w-4 h-full mx-4">
      <svg
        fill="none"
        fill-rule="evenodd"
        stroke="black"
        stroke-width="0.501"
        stroke-linejoin="bevel"
        stroke-miterlimit="10"
        font-family="Times New Roman"
        font-size="16"
        style="font-variant-ligatures: none"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        overflow="visible"
        width="11.994pt"
        height="11.994pt"
        viewBox="0 -11.994 11.994 11.994"
      >
        <g id="Layer 1" transform="scale(1 -1)">
          <text
            xml:space="preserve"
            transform="translate(4.414 2.392) scale(1 -1)"
            kerning="auto"
            font-size="10.07"
            font-weight="bold"
            stroke="none"
            stroke-width="0.252"
            stroke-linecap="round"
            stroke-linejoin="round"
            font-family="Open Sans"
            fill="#000000"
          >
            <tspan x="0" y="0">!</tspan>
          </text>
          <ellipse
            rx="5.709"
            ry="5.709"
            transform="translate(5.997 5.997) rotate(135.007)"
            stroke="#050000"
            stroke-width="0.577"
            stroke-linejoin="round"
            stroke-linecap="round"
          />
        </g>
      </svg>
    </div>
    <div v-html="sanitizedHtml(props?.textHTML)" />
  </div>
</template>

<style module lang="postcss" scoped>
.Notice {
  @apply mb-4 p-4;
  @apply rounded-xl;
  @apply text-sm shadow-lg;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(229, 231, 235, 0.5);
  backdrop-filter: blur(1rem);
}
</style>
