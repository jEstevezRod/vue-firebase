<template>
  <div class="h-screen bg-gray-200">
      <Navbar :dark="true" />
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

</style>