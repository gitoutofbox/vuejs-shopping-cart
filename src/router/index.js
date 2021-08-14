import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/Products.vue"),
  },
  {
    path: "/products/:slug",
    name: "ProductDetails",
    component: () =>
      import(/* webpackChunkName: "products" */ "../views/ProductDetails.vue"),
  },
  {
    path:'/shopping-cart',
    name: "ShoppingCart",
    component: () => import(/* webpackChunkName: "shoppingCart" */ "../views/ShoppingCart.vue")
  },
  {
    path:'/checkout',
    name: "Checkout",
    component: () => import(/* webpackChunkName: "checkout" */ "../views/Checkout.vue")
  },
  {
    path:'/wishlist',
    name: "Wishlist",
    component: () => import(/* webpackChunkName: "wishlist" */ "../views/Wishlist.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes,
});

export default router;
