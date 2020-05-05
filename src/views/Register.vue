<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl mt-10">Register</h1>
    <div class="flex justify-center">
      <section class="flex flex-col justify-center items-center w-full">
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="name">Name</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Evan You"
            name="name"
            @change="errors.name = []"
            v-model="name"
            autocomplete="false"
          />
          <div v-if="errors.name.length > 0" class="mt-4 bg-red-200 px-3 py-3 rounded">
            <ul>
              <li
                v-for="(error, index) of errors.name"
                :key="index"
                class="text-red-500 text-sm"
              >{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="username">Email</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="example@domain.com"
            name="email"
            @change="errors.email = []"
            v-model="email"
            autocomplete="false"
          />
          <div v-if="errors.email.length > 0" class="mt-4 bg-red-200 px-3 py-3 rounded">
            <ul>
              <li
                v-for="(error, index) of errors.email"
                :key="index"
                class="text-red-500 text-sm"
              >{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="password">Password</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            @change="errors.password = []"
            name="password"
            placeholder="************"
            autocomplete="false"
            v-model="password"
          />
          <div v-if="errors.password.length > 0" class="bg-red-200 px-3 py-3 rounded">
            <ul>
              <li
                v-for="(error, index) of errors.password"
                :key="index"
                class="text-red-500 text-sm"
              >{{ error }}</li>
            </ul>
          </div>
        </div>
        <div class="my-3 w-2/3 lg:w-1/3">
          <label class="block text-gray-700 mb-2" for="password">Repeat password</label>
          <input
            class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password2"
            type="password"
            name="password2"
            @change="errors.password2 = []"
            @keydown.enter="register"
            placeholder="************"
            v-model="password2"
            autocomplete="false"
            vid="password2"
          />
          <div v-if="errors.password2.length > 0" class="bg-red-200 px-3 py-3 rounded mb-3">
            <ul>
              <li
                v-for="(error, index) of errors.password2"
                :key="index"
                class="text-red-500 text-sm"
              >* {{ error }}</li>
            </ul>
          </div>
        </div>
        <div v-if="!loading" class="flex items-center justify-between w-2/3 lg:w-1/3">
          <button
            class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            @click="register"
          >Sign up</button>
          <router-link
            class="inline-block align-baseline text-sm text-black hover:text-green-400"
            to="/login"
          >Do you already account? Sign in</router-link>
        </div>
       
         <div v-else class="w-2/3 lg:w-1/3 bg-blue-200 rounded px-3 py-4">
          <p class="text-md text-blue-800">Creating user...</p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: { name: [], email: [], password: [], password2: [] },
    isValid: false,
    loading: false,
    // eslint-disable-next-line
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }),
  methods: {
    register() {
      if (this.validateForm()) {
        this.loading = true;
        this.$store
          .dispatch("register", {
            email: this.email,
            name: this.name,
            password: this.password
          })
          .then(() => {
            this.$notify({
              message: "Registration successfully!",
              type: "success",
              top: true,
              bottom: false,
              left: false,
              right: true,
              showClose: false,
              closeDelay: 4500
            });
            this.name = "";
            this.email = "";
            this.password = "";
            this.password2 = "";
            this.loading = false;
            this.$router.push("/login");
          });
      }
    },
    validateForm() {
      if (
        this.errors.email.name > 0 ||
        this.errors.email.length > 0 ||
        this.errors.password.length > 0 ||
        this.errors.password2.length > 0
      ) {
        this.errors = { name: [], email: [], password: [], password2: [] };
      }
      if (this.name.length === 0) {
        this.errors["name"] = [...this.errors.name, ...["Name is required."]];
      }
      if (this.email.length === 0) {
        this.errors["email"] = [
          ...this.errors.email,
          ...["Email is required."]
        ];
      }
      if (!this.emailRegex.test(this.email)) {
        this.errors["email"] = [
          ...this.errors.email,
          ...["Please enter a correct email address."]
        ];
      }
      if (this.password.length === 0) {
        this.errors["password"] = [
          ...this.errors.password,
          ...["Password are required."]
        ];
      }
      if (this.password.length < 6) {
        this.errors["password"] = [
          ...this.errors.password,
          ...["Password is shorter than 6 characters."]
        ];
      }
      if (this.password.length > 50) {
        this.errors["password"] = [
          ...this.errors.password,
          ...["Password is bigger than 50 characters."]
        ];
      }
      if (this.password2.length === 0) {
        this.errors["password2"] = [
          ...this.errors.password2,
          ...["Password are required."]
        ];
      }
      if (this.password2.length < 6) {
        this.errors["password2"] = [
          ...this.errors.password2,
          ...["Password is shorter than 6 characters."]
        ];
      }
      if (this.password2.length > 50) {
        this.errors["password2"] = [
          ...this.errors.password2,
          ...["Password is bigger than 50 characters."]
        ];
      }
      if (this.password !== this.password2) {
        this.errors["password"] = [
          ...this.errors.password,
          ...["Passwords aren't the same."]
        ];
      }
      let isEmpty = a => Array.isArray(a) && a.every(isEmpty);
      return isEmpty(Object.values(this.errors));
    }
  }
};
</script>

<style>
</style>