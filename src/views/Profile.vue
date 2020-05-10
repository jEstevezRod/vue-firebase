<template>
  <div class="container mx-auto">
    <ProfileHeader :user="user" />
    <div class="mt-5">
      <template v-if="!editMode">
        <button @click="editMode = true" class="bg-blue-400 px-3 py-3 rounded">Edit profile</button>
      </template>
      <template v-else>
        <ProfileForm :user="user" @cancelForm="editMode = false" />
      </template>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export default {
  components: { ProfileHeader, ProfileForm},
  data: () => ({
    editMode: false
  }),
  computed: {
    user() {
      return this.$store.state.user;
    }
  }
};
</script>

<style>
</style>