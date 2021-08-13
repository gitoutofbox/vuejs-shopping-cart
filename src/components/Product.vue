<template>
  <div class="row product-block">
    <div class="col-sm-10">
      <router-link :to="{ name: 'ProductDetails', params: { slug: product.slug } }">
        <h4>{{ product.name | capitalize }}</h4>
      </router-link>
      <div>
        {{ product.price | currency('$') }} <br />
        {{ product.shortInfo }}
      </div>

      <div class="btn-group btn-actions">
        <button
          class="btn btn-primary btn-sm"
          v-on:click="addRemoveCart(product)"
          v-if="productIdInCart.indexOf(product.id) === -1"
        >
          Add to Cart
        </button>
        <button
          class="btn btn-danger btn-sm"
          v-on:click="addRemoveCart(product)"
          v-else
        >
          Remove from Cart
        </button>
        <button
          class="btn btn-success btn-sm"
          v-on:click="addRemoveWishlist(product)"
          v-if="productIdInWishlist.indexOf(product.id) === -1"
        >
          Add to wishlist</button
        ><button
          class="btn btn-warning btn-sm"
          v-on:click="addRemoveWishlist(product)"
          v-else
        >
          Remove from wishlist
        </button>
      </div>
    </div>
    <div class="col-sm-2">
      <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
        <img :src="product.image" alt="product.name" class="product-img" />
      </router-link>
    </div>
  </div>
</template>

<script>
import { serverBus } from "../main";
import shared from "@/shared/productStorage";
export default {
  name: "Product",
  created() {
    this.productIdInCart = shared.getProductIdsInStorage();
    this.productIdInWishlist = shared.getProductIdsInWishlist();
  },
  props: {
    product: Object,
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

<style scoped>
a {
  text-decoration: none;
}
.product-block {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.product-img {
  height: 150px;
}
</style>