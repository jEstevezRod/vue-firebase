<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl mt-10">Login</h1>
    <div class="flex justify-center">
      <form class="max-w-screen-sm" @submit.prevent="login">
        <section class="flex flex-col justify-center items-center">
          <div class="my-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="username">Email</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              v-model="email"
            />
          </div>
          <div class="my-3">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              v-model="password"
              placeholder="******************"
            />
          </div>
          <div class="flex items-center justify-between w-full">
            <button
              class="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >Sign In</button>
            <router-link
              class="inline-block align-baseline text-sm text-black hover:text-green-400"
              to="/register"
            >Not account yet? Sign up</router-link>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then( res => console.log(res))
        .catch(function(error) {
          // Handle Errors here.
          console.error(error.code);
          console.error(error.message);
          // ...
        });
    }
  }
};
</script>

<style>
</style>