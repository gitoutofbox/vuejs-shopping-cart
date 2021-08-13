import Vue from "vue";

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
});

Vue.filter('currency', function (value, type) {
  if (!value) return '';
  let val = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return type + val;
});
