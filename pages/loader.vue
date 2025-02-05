<template>
  <div class="central-loader">
    <div class="w-full mx-8 grid grid-rows-2 justify-center align-center">
      <div class="w-full flex justify-center animate-bounce">
        <img
          class="desktop-image"
          src="/assets/teamwork/11.png"
          style="height: 8rem; width: max-content; object-fit: contain"
          alt="Company Logo"
        />
      </div>
      <div>
        <p class="h-max">
          "Learning patience can be a difficult experience, but once conquered,
          you will find life is easier."
        </p>
        <br />
        <p class="flex justify-end"><b> - Catherine Pulsifer</b></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.central-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}
</style>
