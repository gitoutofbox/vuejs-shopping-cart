<template>
  <div class="row">
    <div class="col-sm-12">
      <h3 class="page-header">My Wishlist</h3>
    </div>
    <div class="col-sm-12" v-for="product in products" :key="product.id">
      <Product :product="product" />
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product";
import shared from "@/shared/productStorage";
export default {
  name: "Wishlist",
  components: {
    Product,
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BASE_URL,
      products: [],
      allProducts: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const resp = await fetch(this.baseUrl + "static/json/products.json");
      const products = await resp.json();
      this.allProducts = [...products.data];
      this.getWishlistItems(this.allProducts);
    },
    getWishlistItems(allItems) {
      const productIdInWishlist = shared.getProductIdsInWishlist();
      this.products = allItems.filter(
        (item) => productIdInWishlist.indexOf(item.id) !== -1
      );
    },
  },
};
</script>

