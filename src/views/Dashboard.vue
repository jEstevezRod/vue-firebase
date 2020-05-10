<template>
  <div class="px-0 sm:px-10 md:px-20 lg:px-20 xl:px-40 pb-20">
    <div class="flex flex-col items-center">
      <div id="dashboard-navbar" class="w-5/6 sm:w-full py-5 flex justify-center">
        <input
          type="text"
          placeholder="search..."
          class="card p-2 w-full sm:w-2/3 md:w-2/3 lg:w-1/3"
        />
      </div>
      <div id="dashboard-main" class="w-5/6 sm:w-full flex flex-wrap">
        <div id="dashboard-main-charts" class="flex flex-col w-full lg:w-9/12">
          <div
            id="dashboard-main-charts-stats"
            class="flex justify-between items-center flex-wrap my-3"
          >
            <div class="my-6 w-full md:w-3/12 h-48 bg-red-200 card">
              <Stat title="NEW USERS TODAY" value="68" imageName="1.svg" />
            </div>
            <div class="my-6 w-full md:w-3/12 h-48 bg-orange-200 card">
              <Stat title="USERS LOGGED IN TODAY" value="341" imageName="2.svg" />
            </div>
            <div class="my-6 w-full md:w-3/12 h-48 bg-purple-200 card">
              <Stat title="ACTIVE USERS NOW" value="612" imageName="3.svg" />
            </div>
          </div>
          <div id="dashboard-main-graph" class="my-10">
            <div class="bg-blue-200 w-full card relative">
              <trend
                :data="[20, 0, 25, 14, 20, 5, 10, 23, 2, 20, 10, 15, 4, 20, 0, 2, 20, 10, 15, 4, 20, 0, 2, 20, 10, 15, 4, 20, 0]"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                style="strokeWidth:1px"
                smooth
                class="h-full w-full"
              ></trend>
                            <span class="absolute text-gray-600 text-xl graph-title cus-font-title">THE MAIN GRAPH FOR THIS PAGE</span>

            </div>
          </div>
          <div id="dashboard-main-info" class="flex flex-wrap justify-between items-center my-3">
            <div class="w-full md:w-2/5 h-56 bg-green-200 my-6 card relative">
              <trend
                :data="[0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                style="strokeWidth:4px"
                smooth
                class="h-full"
              ></trend>
              <span class="absolute text-gray-600 text-lg graph-title cus-font-title">LAST MONTH LOGGED IN</span>
            </div>
            <div class="w-full md:w-2/5 h-56 bg-teal-200 my-6 card relative">
              <trend
                :data="[20, 0, 25, 14, 20, 5, 10, 23, 2, 20, 10, 15, 4, 20, 0]"
                :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
                auto-draw
                style="strokeWidth:4px"
                class="h-full"
                smooth
              ></trend>
                            <span class="absolute text-gray-600 text-lg graph-title cus-font-title">LAST MONTH NEW USERS</span>

            </div>
          </div>
        </div>
        <div id="dashboard-main-feed" class="flex flex-col w-full lg:w-3/12 mt-8">
          <div class="bg-gray-200 w-full ml-0 lg:ml-10 card max-h-screen">
            <p class="text-center text-xl mb-4">Activity</p>
            <div id="feed-activity">
              <Activity action="register" email="jesusestevez@gmail.com" />
              <Activity action="editProfile" email="jesusestevez@gmail.com" />
              <Activity action="signOut" email="jesusestevez@gmail.com" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Activity from "@/components/dashboard/Activity";
import Stat from "@/components/dashboard/Stat";
export default {
  components: { Activity, Stat }
};
</script>

<style scoped>
.card {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-radius: 5px;
  padding: 15px;
  background-clip: padding-box;
}
#feed-activity {
  max-height: 730px;
  overflow: scroll;
}

.graph-title {
  top: 10px;
  left: 10px;
}
</style>