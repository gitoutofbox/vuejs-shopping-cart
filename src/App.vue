<template>
  <div id="app">
    <TheHeader />
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
          <TheLeftSidebar />
        </div>
        <div class="col-sm-9">
          <router-view />
        </div>
      </div>
    </div>
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader";
import TheLeftSidebar from "@/components/TheLeftSidebar";
import TheFooter from "@/components/TheFooter";

export default {
  components: {
    TheHeader,
    TheLeftSidebar,
    TheFooter,
  },
};
</script>
<style></style>
