<script>
export default {
  getProductIdsInStorage() {
    let itemsInCart = localStorage.getItem("itemsInCart");
    itemsInCart =
      itemsInCart && itemsInCart.length ? JSON.parse(itemsInCart) : [];
    return itemsInCart.map((item) => item.id);
  },

  getProductIdsInWishlist() {
    let itemsInWishlist = localStorage.getItem("itemsInWishlist");
    itemsInWishlist = itemsInWishlist && itemsInWishlist.length ? JSON.parse(itemsInWishlist) : [];
    return itemsInWishlist.map((item) => item.id);
  },
  
};
</script>