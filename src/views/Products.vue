<template>
  <div class="row">
    <div
      class="col-sm-12"
      v-for="product in products"
      :key="product.id"
    >
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
    // formatPrice(value) {
    //     let val = (value/1).toFixed(2).replace('.', ',')
    //     return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    // }
  },
};
</script>

