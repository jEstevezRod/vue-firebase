<template>
  <div class="container mx-auto">
    <h1 class="text-center text-2xl mt-10">Register</h1>
    <div class="flex justify-center">
      <form class="max-w-screen-md" @submit.prevent="register">
        <section class="flex flex-col justify-center items-center">
          <div class="my-3 w-full">
            <label class="block text-green-400 text-sm mb-2" for="username">Email</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              v-model="name"
              autocomplete="false"
            />
          </div>
          <div class="my-3 w-full">
            <label class="block text-green-400 text-sm mb-2" for="username">Email</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              @focus="errors.email = []"
              v-model="email"
              autocomplete="false"
            />
            <div v-if="errors.email.length > 0">
              <ul>
                <li
                  v-for="(error, index) of errors.email"
                  :key="index"
                  class="text-red-500 text-sm"
                >{{ error }}</li>
              </ul>
            </div>
          </div>
          <div class="my-3">
            <label class="block text-green-400 text-sm mb-2" for="password">Password</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              @focus="errors.password = []"
              name="password"
              placeholder="************"
              autocomplete="false"
              v-model="password"
            />
            <div v-if="errors.password.length > 0">
              <ul>
                <li
                  v-for="(error, index) of errors.password"
                  :key="index"
                  class="text-red-500 text-sm"
                >{{ error }}</li>
              </ul>
            </div>
          </div>
          <div class="my-3">
            <label class="block text-green-400 text-sm mb-2" for="password">Repeat password</label>
            <input
              class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password2"
              type="password"
              name="password2"
              @focus="errors.password2 = []"
              placeholder="************"
              v-model="password2"
              autocomplete="false"
              vid="password2"
            />
            <div v-if="errors.password2.length > 0">
              <ul>
                <li
                  v-for="(error, index) of errors.password2"
                  :key="index"
                  class="text-red-500 text-sm"
                >{{ error }}</li>
              </ul>
            </div>
          </div>
          <div v-if="!loading" class="flex items-center justify-between w-full">
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >Sign up</button>
            <router-link
              class="inline-block align-baseline text-sm text-black hover:text-green-400"
              to="/login"
            >Do you already account? Sign in</router-link>
          </div>
          <div v-else class="flex items-center justify-between w-full">
            <p class="text-md text-red-500 py-2">Creating user...</p>
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
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: { email: [], password: [], password2: [] },
    isValid: false,
    loading: false,
    // eslint-disable-next-line
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }),
  methods: {
    register() {
      if (this.validateForm()) {
        this.loading = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(data => {
            data.user
              .updateProfile({
                displayName: this.name
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
                this.email = "";
                this.password = "";
                this.password2 = "";
                this.loading = false;
                this.$router.push("/login");
              });
          })
          .catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error(errorCode);
            console.error(errorMessage);
          });
      }
    },
    validateForm() {
      if (
        this.errors.email.length > 0 ||
        this.errors.password.length > 0 ||
        this.errors.password2.length > 0
      ) {
        this.errors = { email: [], password: [], password2: [] };
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
          ...["Passwords are required."]
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
          ...["Passwords are required."]
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