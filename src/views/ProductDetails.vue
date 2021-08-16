<template>
  <div class="row">
    <div class="col-sm-10">
      <h4>{{ product.name | capitalize }}</h4>
      <div class="price">{{ product.price | currency("$") }}</div>
      <ProductActions :product="product" />
      <div class="price">{{ product.longInfo }}</div>
    </div>
    <div class="col-sm-2">
      <img :src="product.image" alt="product.name" class="product-img" />
    </div>
  </div>
</template>

<script>
import ProductActions from "@/components/ProductActions";

export default {
  name: "ProductDetails",
  components: {
    ProductActions,
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      slug: this.$route.params.slug,
      product: {},
    };
  },
  methods: {
    async fetchData() {
      const resp = await fetch(this.baseUrl + "static/json/products.json");
      const products = await resp.json();
      const product = products.data.filter((item) => item.slug === this.slug);
      product.length && (this.product = product[0]);
    },
  },
};
</script>

<style scoped>
.product-img {
  height: 150px;
}
</style>
