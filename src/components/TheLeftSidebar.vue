<template>
  <div class="card sidebar">
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">
          <router-link :to="{ name: 'Wishlist' }">
            Wishlist
            <span class="wishlist-count">{{ count }}</span>
          </router-link>
        </li>
        <li class="list-group-item">
          <router-link :to="{ name: 'ShoppingCart' }"
            >Shopping Cart</router-link
          >
        </li>
        <li>
          <br />
          <h6 class="text-center">Dynamic component loading</h6>
        </li>
        <li
          class="list-group-item"
          v-for="(componentName, index) in components"
          :key="index">
          <component :is="componentName"></component>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
}
.wishlist-count {
  float: right;
}
</style>
<script>
import { serverBus } from "../main";
import shared from "@/shared/productStorage";

import Loading from "@/components/Loading";
import Error from "@/components/Error";

export default {
  name: "TheLeftSidebar",
  components: {},
  created() {
    this.updateCount();
    this.fetchComponent();
    serverBus.$on("addRemoveWishlist", () => {
      this.updateCount();
    });
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      count: 0,
      components: [],
    };
  },
  methods: {
    updateCount() {
      this.count = shared.getProductIdsInWishlist().length;
    },
    async fetchComponent() {
      const resp = await fetch(
        this.baseUrl + "static/json/dynamic-component.json"
      );
      const respObj = await resp.json();
      for (const comp of respObj.data) {
        this.components.push(comp.name);
        this.$options.components[comp.name] = () => ({
          component: import("@/" + comp.path),
          loading: Loading,
          error: Error,
          delay: 200,
          timeout: 3000,
        });
      }
    },
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
a {
  text-decoration: none;
}
</style>
