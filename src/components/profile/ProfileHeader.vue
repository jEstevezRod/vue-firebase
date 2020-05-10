<template>
  <div id="profile-container" class="bg-gray-300 rounded py-5 flex items-center flex-col">
    <div class="relative">
      <img src="../../assets/images/logo.png" alt="Profile logo" style="width:150px" />
      <input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        ref="file"
        class="hidden"
        @change="changeIcon"
      />
      <div
        @click="$refs.file.click()"
        class="absolute bg-red-400 p-1 flex justify-center items-center cursor-pointer"
        style="bottom:0px;right:0px;width:30px;height:30px; border-radius: 50%"
      >
        <font-awesome-icon icon="pencil-alt" class="text-gray-800"></font-awesome-icon>
      </div>
    </div>
    <h2 v-if="user.name" class="text-3xl mt-3">{{user.name}}</h2>
    <span class="text-gray-600 py-2">Email: <strong>{{user.email}}</strong></span>
    <span v-if="user.phoneNumber" class="text-gray-600 py-2">
      Phone number:
      <strong>{{user.phoneNumber}}</strong>
    </span>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    image: null,
    imageUrl: null,
    imageFile: null
  }),
  methods: {
    changeIcon(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener("load", () => {
        this.imageFile = files[0];
        // this.uploadImage();
      });
    },
    uploadImage() {
      // let storageRef = firebase.storage().ref();
      // let profileImage = storageRef.child('images/example.png')
      // profileImage.put(this.imageFile).then(function(snapshot) {
      //   console.log(snapshot);
      //   console.log("Uploaded a blob or file!");
      // });
    }
  }
};
</script>

<style>
</style>