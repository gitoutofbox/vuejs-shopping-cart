<template>
  <div class="row product-block">
    <div class="col-sm-10">
      <h4>{{ product.name }}</h4>
      <div>
        {{ formatPrice(product.price) }} <br />
        {{ product.shortInfo }}
      </div>
      <div class="btn-group">
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
  created() {
    let itemsInCart = localStorage.getItem("itemsInCart");
    itemsInCart = itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];
    this.productIdInCart = itemsInCart.map(item => item.id);
  },
  props: {
    product: Object,
  },
  data() {
      return {
        productIdInCart: []
      }
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async addRemoveCart(product) {
      // Call API here
      let itemsInCart = localStorage.getItem("itemsInCart");
      itemsInCart =
        itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];

      if (itemsInCart.some((inCart) => inCart.id == product.id)) {
        itemsInCart = itemsInCart.filter((inCart) => inCart.id != product.id);
      } else {
        itemsInCart.push(product);
      }
        this.productIdInCart = itemsInCart.map(item => item.id);
      localStorage.setItem("itemsInCart", JSON.stringify(itemsInCart));
      serverBus.$emit("addRemoveCart", product);
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