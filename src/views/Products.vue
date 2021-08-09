<template>
  <div class="row">
    <div class="col-sm-12 product-block" v-for="product in products" :key="product.id">
      <div class="row">
        <div class="col-sm-10">
          <h4>{{ product.name }}</h4>
          {{ formatPrice(product.price) }} <br />
          {{ product.shortInfo }}
        </div>
        <div class="col-sm-2">
          <img :src="product.image" alt="product.name" class="product-img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Products",
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
    formatPrice(value) {
        let val = (value/1).toFixed(2).replace('.', ',')
        return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
  },
};
</script>

<style scoped>
.product-block{
    border-bottom: 1px solid #ddd;
    margin-bottom: 15px;
}
.product-img{
    height: 150px;
}
</style>