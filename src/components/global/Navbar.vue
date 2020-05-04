<template>
  <header class="py-6">
    <nav class="w-screen flex justify-center">
      <ul class="flex">
        <li class="mr-12">
          <router-link class="text-gray-300 hover:text-gray-800 text-lg text-bold" to="/">Home</router-link>
        </li>
        <li class="mr-12">
          <router-link class="text-gray-300 hover:text-gray-800 text-lg text-bold" to="/about">About</router-link>
        </li>
        <li>
          <router-link class="text-gray-300 hover:text-gray-800 text-lg text-bold" to="/login">Sign In/Sign Up</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {};
</script>

<style>
</style>