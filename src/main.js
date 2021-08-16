import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "./helpers/filters";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSpinner, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faSpinner, faShoppingCart);

Vue.component("font-awesome-icon", FontAwesomeIcon);

import "@/assets/style.css";

Vue.config.productionTip = false;

export const serverBus = new Vue();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
