<template>
  <header>
    <div class="navigation">
      <TheNavigation />
    </div>
    <div class="cart-count">
      <CartCount />
    </div>
  </header>
</template>

<script>
import TheNavigation from "@/components/TheNavigation";
import CartCount from "@/components/CartCount";
export default {
  name: "TheHeader",
  components: {
    TheNavigation,
    CartCount,
  },
};
</script>
<style scoped>
header {
  position: relative;
  width: 100%;
}

.cart-count {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>
