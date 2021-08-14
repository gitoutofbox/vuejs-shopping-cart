<template>
  <div>
    <h3 class="page-header">My Shoppiing List</h3>
    <div v-if="products.length">
      <div class="row">
        <div class="col-sm-12 text-end">
          <router-link :to="{ name: 'Checkout' }">
            <button class="btn btn-success btn-sm" v-on:click="checkout()">
              Checkout
            </button>
          </router-link>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-sm-12" v-for="product in products" :key="product.id">
          <CartProduct :product="product" :buttons="['cart']" />
        </div>
      </div>
      <div class="row">
        <div class="col-sm-2 offset-sm-10">{{ total | currency("$") }}</div>
      </div>
      <div class="row">
        <div class="col-sm-12 text-end">
          <router-link :to="{ name: 'Checkout' }">
            <button class="btn btn-success btn-sm" v-on:click="checkout()">
              Checkout
            </button>
          </router-link>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-sm-12 text-center">
          Nothing in your cart<br />
          <router-link :to="{ name: 'Products' }">
            <button class="btn btn-primary btn-sm">Continue shopping</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { serverBus } from "@/main";
import shared from "@/shared/productStorage";
import CartProduct from "@/components/CartProduct";
export default {
  name: "ShoppingCart",
  components: {
    CartProduct,
  },
  created() {
    this.fetchData();
    serverBus.$on("addRemoveCart", () => {
      this.getCartItems(this.allProducts);
    });
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      products: [],
      allProducts: [],
      productIdInStorage: [],
      total: Number,
    };
  },
  methods: {
    async fetchData() {
      const resp = await fetch(this.baseUrl + "static/json/products.json");
      const products = await resp.json();
      this.allProducts = [...products.data];
      this.getCartItems(this.allProducts);
    },
    getCartItems(allItems) {
      this.productIdInStorage = shared.getProductIdsInStorage();
      this.products = allItems.filter(
        (item) => this.productIdInStorage.indexOf(item.id) !== -1
      );
      this.totalAmount();
    },
    totalAmount() {
      this.total = this.products.reduce((a, b) => a.price + b.price, 0);
    },
    checkout() {},
  },
};
</script>