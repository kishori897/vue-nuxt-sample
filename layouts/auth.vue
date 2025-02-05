<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="flex-1">
      <slot />
    </div>

    <site-footer />
  </div>
</template>

<style lang="postcss">
@custom-media --sm (min-width: 640px);
@custom-media --md (min-width: 768px);
@custom-media --lg (min-width: 1024px);
@custom-media --xl (min-width: 1280px);
@custom-media --2xl (min-width: 1536px);

@custom-selector :--block
  h1,
  h2,
  h3,
  p,
  ul,
  ol,
  dl,
  div,
  section,
  article,
  blockquote;
</style>
