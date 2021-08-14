<template>
  <div class="row">
    <div class="col-sm-12 text-center">
      <h2>
        <div class="alert alert-success" role="alert">
          Your order has been placed successfully
        </div>
      </h2>
    </div>
  </div>
</template>

<script>
import { serverBus } from "../main";

export default {
    name: 'Checkout',
    created() {
        this.clearCartStorage();
    },
    methods: {
        clearCartStorage() {
            localStorage.removeItem('itemsInCart');
            serverBus.$emit("addRemoveCart", []);
        }
    }
}
</script>