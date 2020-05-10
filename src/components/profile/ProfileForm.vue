<template>
  <div id="edit-profile-fields" class="flex flex-col justify-center items-center w-full">
    <div class="bg-red-500 px-6 py-5 rounded text-white" v-if="error">
      <span>{{errorMsg}}</span>
    </div>
    <div class="my-3 w-2/3 lg:w-1/3">
      <label class="block text-gray-700 mb-2" for="name">Name</label>
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        placeholder="John Doe"
        name="name"
        v-model="userData.name"
      />
    </div>
    <div class="my-3 w-2/3 lg:w-1/3">
      <label class="block text-gray-700 mb-2" for="phoneNumber">Phone number</label>
      <input
        class="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="phoneNumber"
        type="tel"
        placeholder="687 654 321"
        name="phoneNumber"
        v-model="userData.phoneNumber"
      />
    </div>

    <div v-if="!loading" class="my-3 w-2/3 lg:w-1/3">
      <button @click="update" class="px-4 py-3 bg-green-400 hover:bg-green-600 rounded mr-5">Update</button>
      <button
        :disabled="loading"
        @click="$emit('cancelForm', false)"
        class="px-4 py-3 bg-red-400 hover:bg-red-600 rounded"
      >Cancel</button>
    </div>
    <template v-else>
        <div class="my-3 w-2/3 lg:w-1/3">
            <span class="text-gray-700">Updating...</span>
        </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    userData: { name: "", phoneNumber: "" },
    loading: false,
    error: false,
    errorMsg: ""
  }),
  mounted() {
    this.userData.name = this.user.name;
    this.userData.phoneNumber = this.user.phoneNumber;
  },
  methods: {
    update() {
        // some validations
      if (
        this.userData.name === this.user.name &&
        this.userData.phoneNumber === this.user.phoneNumber
      ) {
        return;
      }
      if (this.userData.name.length == "0") {
        this.error = true;
        this.errorMsg = "Your name is empty, please fill in it.";
        return false;
      }
      // Start updating proccess
      this.error = false;
      this.loading = true;

      this.$store
        .dispatch("updateUser", {
          ...this.userData,
          uid: this.user.uid
        })
        .then(() => {
          this.loading = false;
          this.$notify({
            message: "Updated successfully!",
            type: "success",
            top: true,
            bottom: false,
            left: false,
            right: true,
            showClose: false,
            closeDelay: 2500
          });
        });
    },
    cancel() {
      this.userData = {};
      this.$router.push("/app/profile");
    }
  }
};
</script>

<style>
</style>