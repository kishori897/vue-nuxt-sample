<template>
  <div :class="$style.MakeItPop" :style="popStyle">
    <div :class="$style.Content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import colors from "tailwindcss/colors"

const popStyle = computed(() => {
  return {
    "--snap": colors.green[600],
    "--crackle": colors.orange[400],
  }
})
</script>

<style module lang="postcss">
.MakeItPop {
  position: relative;

  &::before,
  &::after {
    position: absolute;
    content: "";
    border-radius: 100%;
    width: 70%;
    height: 50%;
    filter: blur(4.5em);
    z-index: 0;
    opacity: 0.2;
  }

  &::before {
    transform: rotate(4deg) translate(40%, -20%);
    background-color: var(--crackle);
  }

  &::after {
    transform: rotate(6deg) translate(-20%, -40%);
    background-color: var(--snap);
  }

  @screen md {
    &::before {
      transform: rotate(4deg) translate(80%, -20%);
    }

    &::after {
      transform: rotate(6deg) translate(-20%, -40%);
    }
  }
}

.Content {
  position: relative;
  z-index: 1;
  width: 100%;
}
</style>
