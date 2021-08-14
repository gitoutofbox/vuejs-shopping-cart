<template>
  <div class="row product-block">
    <div class="col-sm-2">
      <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
        <img :src="product.image" alt="product.name" class="product-img" />
      </router-link>
    </div>
    <div class="col-sm-8">
      <router-link
        :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
      >
        <h4>{{ product.name | capitalize }}</h4>
      </router-link>
      <div>{{ product.shortInfo }}</div>

      <ProductActions :product="product" :buttons="buttons" />
    </div>
    <div class="col-sm-2">
         {{ product.price | currency("$") }}
    </div>
  </div>
</template>

<script>
import ProductActions from "@/components/ProductActions";

export default {
  name: "CartProduct",
  components: {
    ProductActions,
  },
  created() {
    // Nothing here
  },
  props: {
    product: Object,
    buttons: {
      type: Array,
      default: function () {
        return ["cart", "wishlist"];
      },
    },
  },
  data() {
    return {
      // Nothing here
    };
  },
  methods: {
    // Nothing here
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}
.product-block {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.product-img {
  height: 150px;
}
</style>