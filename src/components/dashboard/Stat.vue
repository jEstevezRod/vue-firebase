<template>
  <div class="w-full h-full flex flex-col relative">
    <div class="flex flex-row justify-center items-center w-full">
      <div class="w-1/2 flex justify-center block md:hidden xl:block">
        <img :src="getImgUrl()" class="absolute custom-position" />
      </div>
      <div class="w-1/2 md:w-full xl:w-1/2 flex flex-col justify-center xl:ml-8">
        <span class="text-lg text-gray-600 text-center cus-font-title">{{title}}</span>
        <span style="font-size: 3rem; line-height:1.5" class="text-center text-blue-700 cus-font-title">{{value}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imageName: {
      type: String
    },
    title: {
        type: String
    },
    value: {
        type: String || Number
    }
  },
  methods: {
    getImgUrl() {
      return "/img/illustrations/" + this.imageName;
    }
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .custom-position {
    top: -50px !important;
    left: -40px !important;
  }
}

.icon-custom {
  font-size: 5rem;
}
.custom-position {
  top: -50px;
  left: -100px;
  max-width: 250px;
}
.cus-font-title {
  font-family: "Source Code Pro", monospace;
}
</style>