<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl mt-10">Login</h1>
    <div class="flex justify-center">
      <section class="flex flex-col justify-center items-center w-full">
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="username">Email</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="example@domain.com"
            name="email"
            v-model="email"
          />
        </div>
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            v-model="password"
            placeholder="************"
            @keydown.enter="login"
          />
        </div>
        <div v-if="error" class="mb-6">
          <div class="bg-red-200 rounded px-3 py-4">
            <p class="text-red-400">{{error.message}}</p>
          </div>
        </div>
        <div v-if="!loading" class="flex items-center justify-between w-2/3 lg:w-1/3">
          <button
            class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="login"
          >Sign In</button>
          <router-link
            class="inline-block align-baseline text-sm text-black hover:text-green-400"
            to="/register"
          >Not account yet? Sign up</router-link>
        </div>
        <div v-else class="w-2/3 lg:w-1/3 bg-blue-200 rounded px-3 py-4">
          <p class="text-md text-blue-800">Loading...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
    loading: false,
    error: null
  }),
  mounted() {
      if (this.$store.state.LOGGED_IN) {
        this.$router.push("/app");
      } 
  },
  methods: {
    login() {
      this.loading = true;
      this.error = null;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.$notify({
            message: "Login successfully!",
            type: "success",
            top: true,
            bottom: false,
            left: false,
            right: true,
            showClose: false,
            closeDelay: 4500
          });
          this.loading = false;
          this.$router.push("/app");
        })
        .catch(async error => {
          this.password = "";
          this.error = await error;
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>

<style>
</style>