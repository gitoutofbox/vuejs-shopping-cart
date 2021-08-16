<template>
  <div class="row">
    <div class="col-sm-8">
      <div class="alert alert-info">
        Use <strong>admin@admin.com/test@1234</strong>
      </div>
      <div class="alert alert-warning">
        This login using <strong>session storate</strong>, so it work persists
        in different browser tabs
      </div>

      <div
        class="alert alert-danger"
        v-if="errors.emailOrPassword && errors.emailOrPassword != ''"
      >
        <strong>Error:</strong> {{ errors.emailOrPassword }}
      </div>

      <form v-on:submit="submit($event)" novalidate>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            v-model="email"
          />
          <div
            class="form-test text-danger"
            v-if="errors.email && errors.email != ''"
          >
            {{ errors.email }}
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            v-model="password"
          />
          <div
            class="form-test text-danger"
            v-if="errors.password && errors.password != ''"
          >
            {{ errors.password }}
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>
<script>
import { serverBus } from "../main";

export default {
  name: "Login",
  data() {
    return {
      email: "admin@admin.com",
      password: "test@1234",
      errors: {},
      showNavigationConfirm: true,
    };
  },
  beforeRouteLeave(to, from, next) {
    if (this.showNavigationConfirm) {
      if (
        confirm(
          'It is "beforeRouteLeave" testing.\nAre you sure you don\'t want to login?'
        )
      ) {
        next();
      } else {
        next(false);
      }
    } else {
      next();
    }
  },
  methods: {
    submit(e) {
      this.showNavigationConfirm = false;
      e.preventDefault();
      if (this.validate()) {
        sessionStorage.setItem("isLoggedIn", true);
        if (this.email === "admin@admin.com" && this.password === "test@1234") {
          serverBus.$emit("userLogin", true);
          this.$router.push(this.$route.query.redirect || "/");
        } else {
          this.showNavigationConfirm = true;
          this.addErrorMessage(
            "emailOrPassword",
            "Wrong Email or pssword. Use admin@admin.com/test@1234"
          );
        }
      }
    },
    validate() {
      this.errors = {};
      !this.email && this.addErrorMessage("email", "Email is required");
      this.email &&
        !this.isValidEmail(this.email) &&
        this.addErrorMessage("email", "Invalid Email");

      !this.password &&
        this.addErrorMessage("password", "Password is required");
      return Object.keys(this.errors).length === 0 ? true : false;
    },
    isValidEmail(email) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
      } else {
        return false;
      }
    },
    addErrorMessage(key, value) {
      this.errors[key] = value;
    },
  },
};
</script>
