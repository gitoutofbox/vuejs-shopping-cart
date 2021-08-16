<template>
  <TheProductDetails :product="product"/>
</template>

<script>
import TheProductDetails from "@/components/TheProductDetails";

export default {
  name: "ProductDetails",
  components: {
    TheProductDetails,
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
}
</script>
