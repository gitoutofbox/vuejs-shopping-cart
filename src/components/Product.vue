<template>
  <div class="row product-block">
    <div class="col-sm-10">
      <h4>{{ product.name }}</h4>
      {{ formatPrice(product.price) }} <br />
      {{ product.shortInfo }}
    </div>
    <div class="col-sm-2">
      <img :src="product.image" alt="product.name" class="product-img" />
    </div>
  </div>
</template>

<script>
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