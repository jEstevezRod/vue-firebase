<template>
  <div class="h-screen cus-bg cus-bg-color">
      <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>


import Navbar from "@/components/global/Navbar";

export default {
  components: { Navbar }
}
</script>

<style>
.cus-bg {
  background-image: url("../assets/images/bg.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.cus-bg-color {
  background-color: #b8cfe6;
}
</style>