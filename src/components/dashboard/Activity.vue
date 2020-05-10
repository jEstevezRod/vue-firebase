<template>
  <div class="activity flex flex-row items-center my-5">
    <div class="mr-5">
      <font-awesome-icon :icon="activityData.icon" class="text-2xl" :class="activityData.color"></font-awesome-icon>
    </div>
    <div class="text">
      <span class="text-gray-800">
        {{activityData.message}}
        <span class="text-gray-600">{{email}}</span>
      </span>
    </div>
  </div>
</template>

<script>
const modes = {
  register: {
    icon: "user-plus",
    message: "New user has been registered with email: ",
    color: "text-green-500"
  },
  signOut: {
    icon: "sign-out-alt",
    message: "The following user has signed out: ",
    color: "text-red-500"
  },
  editProfile: {
      icon: "edit",
    message: "The following user has edited their profile: ",
    color: "text-blue-500"
  }
};

export default {
  props: {
    action: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: "example@gmail.com"
    }
  },
  computed: {
    activityData() {
      return {
        message: modes[this.action].message,
        icon: modes[this.action].icon,
        color: modes[this.action].color
      };
    }
  }
};
</script>

<style>
</style>