<template>
  <header class="py-6">
    <nav class="w-screen flex">
      <div class="w-auto" style="flex: 1 1 0px"></div>
      <div style="flex: 1 1 0px" class="flex justify-center items-center">
        <ul class="flex">
          <router-link
            class="text-gray-300 hover:text-gray-800 text-lg text-bold mr-12 cursor-pointer"
            :class="{ 'text-gray-800': dark }"
            to="/"
            exact
            tag="li"
          >
            <div>Home</div>
          </router-link>
          <router-link
            class="text-gray-300 hover:text-gray-800 text-lg text-bold mr-12 cursor-pointer"
            :class="{ 'text-gray-800': dark }"
            to="/about"
            exact
            tag="li"
          >About</router-link>

          <template v-if="!loggedIn">
            <router-link
              class="text-gray-300 hover:text-gray-800 text-lg text-bold cursor-pointer"
              to="/login"
              tag="li"
            >Sign in</router-link>
          </template>

          <template v-else>
            <router-link
              class="text-gray-300 hover:text-gray-800 text-lg text-bold mr-3 sm:mr-12 cursor-pointer"
              :class="{ 'text-gray-800': dark }"
              to="/app"
              exact
              tag="li"
            >Dashboard</router-link>
          </template>
        </ul>
      </div>
      <div class="flex flex-row justify-start sm:justify-end items-center" style="flex: 1 1 0px">
        <div v-if="loggedIn">
          <ul class="flex">
            <li v-if="user" class="pr-5">
              <div class="dropdown inline-block relative">
                <button
                  class="text-blue-700 font-semibold py-2 px-3 rounded inline-flex items-center"
                >
                  <span class="mr-1">{{user.displayName}}</span>
                  <svg
                    class="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                    />
                  </svg>
                </button>
                <ul
                  class="dropdown-menu absolute rounded hidden text-gray-700 bg-white"
                  style="min-width:150px"
                >
                  <li class="bg-white rounded">
                    <a
                      class="rounded hover:bg-gray-300 py-3 px-4 block whitespace-no-wrap"
                      href="#"
                    >Profile</a>
                  </li>
                  <li class="bg-white rounded">
                    <a
                      class="rounded hover:bg-red-400 py-3 px-4 block whitespace-no-wrap cursor-pointer"
                      @click.prevent="logout"
                    >Sign out</a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    loggedIn() {
      return this.$store.state.LOGGED_IN;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
}


</style>