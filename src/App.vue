<template>
  <div id="app" class="min-h-screen cus-bg-color cus-bg">
    <Navbar />
    <router-view />
  </div>
</template>
<script>
import Navbar from "@/components/global/Navbar";

export default {
  components: { Navbar }
};
</script>
<style lang="scss">
.cus-bg {
  background-image: url('./assets/images/bg.svg');
      background-repeat: no-repeat;
    background-size: contain;
}
.cus-bg-color {
  background-color: #b8cfe6;
}
</style>
