<template>
  <div class="card sidebar">
    <div class="card-body">
      <ul class="list-group list-group-flush">
        <li class="list-group-item">Profile</li>
        <li class="list-group-item">
          Wishlist
          <span class="wishlist-count">{{count}}</span>
        </li>
        <li class="list-group-item">Shopping Cart</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
}
.wishlist-count{
  float: right;
}
</style>
<script>
import { serverBus } from "../main";
export default {
  name: "TheLeftSidebar",
  created() {
    this.updateCount();
    serverBus.$on("addRemoveWishlist", () => {
      this.updateCount();
    });
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    updateCount() {
      let itemsInWishlist = localStorage.getItem("itemsInWishlist");
      itemsInWishlist =
        itemsInWishlist && itemsInWishlist.length ? JSON.parse(itemsInWishlist) : [];
      this.count = itemsInWishlist.length;
    },
  },
};
</script>