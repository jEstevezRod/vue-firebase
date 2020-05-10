<template>
  <div v-if="firebaseLoaded" id="app" class="min-h-screen h-full">
    <router-view />
  </div>
</template>
<script>
export default {
  data: () => ({
    firebaseLoaded: false
  }),
  computed: {
    loggedIn() {
      return this.$store.state.LOGGED_IN;
    }
  },
  watch: {
    loggedIn() {
      if (
        typeof this.loggedIn == "object" ||
        typeof this.loggedIn == "boolean"
      ) {
        this.firebaseLoaded = true;
      } else {
        this.firebaseLoaded = false;
      }
    }
  }
};
</script>
<style lang="scss">
.cus-bg {
  background-image: url("./assets/images/bg.svg");
  background-repeat: no-repeat;
  background-size: contain;
}
.cus-bg-color {
  background-color: #b8cfe6;
}
</style>
