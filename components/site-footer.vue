<template>
  <footer :class="$style.SiteFooter">
    <img
      src="/assets/logo/smallLogo.png"
      style="height: 3rem; width: 3rem; padding: 0 0.6rem; object-fit: contain"
      alt="This is logo"
    />

    <nav :class="$style.Nav">
      <ul>
        <li>
          <a href="https://sample.me/privacy/dataprocessor" target="_blank"
            >Privacy</a
          >
        </li>
        <li>
          <a href="https://app.sample.com/terms" target="_blank">Terms</a>
        </li>
        <li>
          <a href="https://support.sample.com/" target="_blank">Help</a>
        </li>
      </ul>
    </nav>
  </footer>
</template>

<script setup lang="ts"></script>

<style module lang="postcss">
.SiteFooter {
  @apply w-full;
  @apply p-5;

  display: flex;
  justify-content: center;
  align-items: center;

  & svg {
    @apply mr-4 w-24 max-h-8 h-full;
  }
}

.Nav {
  & ul {
    display: flex;
    margin-top: 0.2rem;
  }

  & li {
    @apply text-sm;
  }

  & a {
    @apply px-2 text-gray-700 underline;
  }
}

@media print {
  .SiteFooter {
    @apply p-2;
  }

  .Nav {
    display: none;
  }
}
</style>
