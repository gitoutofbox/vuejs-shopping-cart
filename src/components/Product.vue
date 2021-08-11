<template>
  <div class="row product-block">
    <div class="col-sm-10">
      <h4>{{ product.name }}</h4>
      <div>
        {{ formatPrice(product.price) }} <br />
        {{ product.shortInfo }}
      </div>
      <div class="btn-group">
        <button class="btn btn-primary btn-sm" v-on:click="addToCart(product)">
          Add to Cart
        </button>
        <button class="btn btn-dark btn-sm">Go to Cart</button>
        <button class="btn btn-success btn-sm">Add to wishlist</button>
      </div>
    </div>
    <div class="col-sm-2">
      <img :src="product.image" alt="product.name" class="product-img" />
    </div>
  </div>
</template>

<script>
import { serverBus } from "../main";
export default {
  name: "Product",
  props: {
    product: Object,
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async addToCart(product) {
      // Call API here
      let itemsInCart = localStorage.getItem("itemsInCart");
      itemsInCart =
        itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];

      if (itemsInCart.some((inCart) => inCart.id == product.id)) {
        itemsInCart = itemsInCart.filter((inCart) => inCart.id != product.id);
      } else {
        itemsInCart.push(product);
      }

      localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      serverBus.$emit("addToCart", product);
    },
  },
};
</script>

<style scoped>
.product-block {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.product-img {
  height: 150px;
}
</style>