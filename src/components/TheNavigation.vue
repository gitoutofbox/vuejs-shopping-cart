<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link btn btn-link" v-on:click="logout()">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { serverBus } from "../main";
export default {
  name: "TheNavigation",
  created() {
    let isLoggedIn = sessionStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    serverBus.$on("userLogin", (isLoginSuccess) => {
      this.isLoggedIn = isLoginSuccess;
    });
  },
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    logout() {
      sessionStorage.removeItem("isLoggedIn");
      serverBus.$emit("userLogin", false);
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
nav {
  margin-bottom: 15px;
}
</style>
