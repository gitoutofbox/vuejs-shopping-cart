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
  name: "TheProductDetails",
  components: {
    ProductActions,
  },
  props: {
    product: Object
  },
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.product-img {
  height: 150px;
}
</style>
