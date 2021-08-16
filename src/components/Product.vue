<template>
  <div class="row product-block">
    <div class="col-sm-10">
      <router-link
        :to="{ name: 'ProductDetails', params: { slug: product.slug } }"
      >
        <h4>{{ product.name | capitalize }}</h4>
      </router-link>
      <button class="btn-edit" v-on:click="showModal = true">
        <font-awesome-icon icon="eye" />
      </button>
      <div>
        {{ product.price | currency("$") }} <br />
        {{ product.shortInfo }}
      </div>

      <ProductActions :product="product" :buttons="buttons" />
    </div>
    <div class="col-sm-2">
      <router-link :to="{ name: 'ProductDetails', params: { id: product.id } }">
        <img :src="product.image" alt="product.name" class="product-img" />
      </router-link>
    </div>

    <AppModal body="body" :showModal="showModal" @onClose="showModal = $event">
      <template v-slot:header>Product Details</template>
      <template v-slot:body>
        <TheProductDetails :product="product"/>
      </template>
    </AppModal>
  </div>
</template>

<script>
import ProductActions from "@/components/ProductActions";
import AppModal from "@/components/AppModal";
import TheProductDetails from "@/components/TheProductDetails";
export default {
  name: "Product",
  components: {
    ProductActions,
    AppModal,
    TheProductDetails,
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
      showModal: false,
    };
  },
  methods: {
    // Nothing here
  },
};
</script>

<style scoped>
h4 {
  display: inline-block;
  margin-right: 15px;
}
a {
  text-decoration: none;
}
.btn-edit {
  border:0;
  padding: 0;
  background: transparent;
}
.btn-edit:hover{
  color:tomato;
}
.product-block {
  border-bottom: 1px solid #ddd;
  margin-bottom: 15px;
}
.product-img {
  height: 150px;
}
</style>
