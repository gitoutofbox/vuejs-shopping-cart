<template>
  <div class="btn-group btn-actions">
    <button
      class="btn btn-primary btn-sm"
      v-on:click="addRemoveCart(product)"
      v-if="
        buttons.indexOf('cart') !== -1 &&
        productIdInCart.indexOf(product.id) === -1
      "
    >
      Add to Cart
    </button>
    <button
      class="btn btn-danger btn-sm"
      v-on:click="addRemoveCart(product)"
      v-else-if="buttons.indexOf('cart') !== -1"
    >
      Remove from Cart
    </button>
    <button
      class="btn btn-success btn-sm"
      v-on:click="addRemoveWishlist(product)"
      v-if="
        buttons.indexOf('wishlist') !== -1 &&
        productIdInWishlist.indexOf(product.id) === -1
      "
    >
      Add to wishlist</button
    ><button
      class="btn btn-warning btn-sm"
      v-on:click="addRemoveWishlist(product)"
      v-else-if="buttons.indexOf('wishlist') !== -1"
    >
      Remove from wishlist
    </button>
  </div>
</template>

<script>
import { serverBus } from "../main";
import shared from "@/shared/productStorage";
export default {
  name: "ProductActions",
  props: {
    product: Object,
    buttons: {
      type: Array,
      default: function () {
        return ["cart", "wishlist"];
      },
    },
  },
  created() {
    this.productIdInCart = shared.getProductIdsInStorage();
    this.productIdInWishlist = shared.getProductIdsInWishlist();
  },
  data() {
    return {
      productIdInCart: [],
      productIdInWishlist: [],
    };
  },
  methods: {
    addRemoveCart(product) {
      // Call API here
      let itemsInCart = localStorage.getItem("itemsInCart");
      itemsInCart =
        itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];

      if (itemsInCart.some((inCart) => inCart.id == product.id)) {
        itemsInCart = itemsInCart.filter((inCart) => inCart.id != product.id);
      } else {
        itemsInCart.push(product);
      }
      this.productIdInCart = itemsInCart.map((item) => item.id);
      localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      serverBus.$emit("addRemoveCart", product);
    },
    addRemoveWishlist(product) {
      // Call API here
      let itemsInWishlist = localStorage.getItem("itemsInWishlist");
      itemsInWishlist =
        itemsInWishlist && itemsInWishlist.length
          ? JSON.parse(itemsInWishlist)
          : [];

      if (itemsInWishlist.some((inCart) => inCart.id == product.id)) {
        itemsInWishlist = itemsInWishlist.filter(
          (inCart) => inCart.id != product.id
        );
      } else {
        itemsInWishlist.push(product);
      }
      this.productIdInWishlist = itemsInWishlist.map((item) => item.id);
      localStorage.setItem("itemsInWishlist", JSON.stringify(itemsInWishlist));
      serverBus.$emit("addRemoveWishlist", product);
    },
  },
};
</script>
