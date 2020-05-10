<template>
  <div>
    <main class="flex w-full flex-wrap mt-24">
      <div class="w-full md:w-1/2 flex justify-center items-center">
        <img src="@/assets/images/island.svg" style="max-width: 500px;width:100%" />
      </div>
      <div class="w-full md:pl-20 md:pr-10 md:w-1/2 flex justify-center mt-20 sm:mt-0 flex-col">
        <p
          class="text-center md:text-left text-2xl md:text-3xl lg:text-3xl md:text-white text-blue-700 text-bold"
        >What do you think it is possible to do without Backend?</p>
        <br />
        <p
          class="text-center md:text-left md:text-2xl lg:text-2xl md:text-white text-blue-800"
        >Let's find out</p>
        <div class="mt-10 flex justify-center">
          <router-link class="bg-green-400 hover:bg-green-600 px-5 py-3 rounded" to="/login">Get started</router-link>
        </div>
      </div>
    </main>
    <section class="technologies container mx-auto mt-16">
      <h1 class="text-4xl text-gray-900 text-center">Technologies</h1>

      <div class="flex justify-around py-20 flex-wrap">

        <div class="max-w-sm rounded overflow-hidden flex items-center flex-col">
          <img class="w-full p-5" src="../assets/images/Vue.png" alt="Vue js" style="width: 150px;height:150px" />
          <div class="px-6 py-4">
            <div class="text-2xl text-center text-white mb-2">Vue.js</div>
            </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden  flex items-center flex-col">
          <img class="w-full p-5" src="../assets/images/firebase.webp" alt="Firebase" style="width: 150px;height:150px" />
          <div class="px-6 py-4">
            <div class="text-2xl text-center text-white mb-2">Firebase</div>
            </div>
        </div>
        <div class="max-w-sm rounded overflow-hidden flex items-center flex-col">
          <img class="w-full p-5" src="../assets/images/tailwind.png" alt="Tailwind css" style="width: 150px;height:150px" />
          <div class="px-6 py-4">
            <div class="text-2xl text-center text-white mb-2">Tailwind</div>
            </div>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>
