<template>
  <div class="row">
    <div class="col-sm-12">
      <h3 class="page-header">All Products</h3>
    </div>
    <div class="col-sm-12" v-for="product in products" :key="product.id">
      <Product :product="product" />
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
export default {
  name: "Products",
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      products: [],
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await fetch(this.baseUrl + "static/json/products.json");
      const products = await resp.json();
      this.products = products.data;
    },
  },
};
</script>
