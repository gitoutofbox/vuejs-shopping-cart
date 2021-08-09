<template>
  <div id="app">
    <TheNavigation />
    <div class="container">
      <div class="row">
        <div class="col-3">
          <TheLeftSidebar />
        </div>
        <div class="col-9">
          <router-view />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheNavigation from "@/components/TheNavigation";
import TheLeftSidebar from "@/components/TheLeftSidebar";
import TheFooter from "@/components/TheFooter";

export default {
  components: {
    TheNavigation,
    TheLeftSidebar,
    TheFooter
  },
};
</script>
<style>
</style>
