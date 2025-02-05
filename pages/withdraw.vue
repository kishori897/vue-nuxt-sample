<template>
  <PageContainer :class="$style.Withdrawn">
    <make-it-pop class="pb-2 flex items-center">
      <div class="w-full flex justify-center">
        <company-logo class="mb-4 justify-center" />
      </div>
      <IslandContainer class="p-10 max-w-xl">
        <h1 class="text-3xl font-medium text-center mb-2">
          Invitation declined
        </h1>
        <p>
          The organiser has been notified that you will not be submitting a
          response. If you change your mind, click the link in your email again,
          and choose Accept.
        </p>
        <p>
          If you're having technical issues, please visit our
          <a href="https://support.shortlister.com/">technical help page</a>
          for assistance.
        </p>
      </IslandContainer>
    </make-it-pop>
  </PageContainer>
</template>

<style module lang="postcss">
.Withdrawn {
  @apply h-screen flex items-center justify-center;
  @apply mx-auto;
  @apply text-center text-gray-900;

  & * + :--block {
    @apply mt-4;
  }

  & a {
    @apply underline;
  }

  & p {
    @apply text-base text-start py-2;
  }
}
</style>
