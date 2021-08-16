<template>
  <span class="cart-main">
    <router-link :to="{ name: 'ShoppingCart' }">
      <font-awesome-icon
        icon="shopping-cart"
        :size="size"
        :style="{ color: color }"
      />
      <span class="cart-count" :style="{ color: color }">{{ count }}</span>
    </router-link>
  </span>
</template>

<script>
import { serverBus } from "../main";
import shared from "@/shared/productStorage";
export default {
  name: "CartCount",
  created() {
    this.updateCount();
    serverBus.$on("addRemoveCart", () => {
      this.updateCount();
    });
  },
  props: {
    color: {
      type: String,
      default: "white",
    },
    size: {
      type: String,
      default: "lg",
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    updateCount() {
      // let itemsInCart = localStorage.getItem("itemsInCart");
      // itemsInCart = itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];
      // this.count = itemsInCart.length;
      this.count = shared.getProductIdsInStorage().length;
    },
  },
};
</script>
<style scoped>
.cart-main {
  position: relative;
}
.cart-count {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}
</style>
