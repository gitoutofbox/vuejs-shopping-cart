<template>
  <div class="app-modal-main" v-if="showModal">
    <div class="app-modal">
      <div class="header">
        <h4>
            <slot name="header">default</slot>
        </h4>
        <button class="close" v-on:click="close">
            <font-awesome-icon icon="window-close" />
        </button>
      </div>
      <div class="body">
          <slot name="body">default</slot>
      </div>
    </div>
    <div class="overlay"></div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    showModal: Boolean
  },
  methods: {
      close() {
        //   this.showModal = false;
          this.$emit('onClose', false);
      }
  }
};
</script>

<style scoped>
.app-modal-main {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.overlay {
  position: fixed;
  background: #000;
  opacity: 0.5;
  z-index: 1;
  width: 100%;
  height: 100%;
}
.app-modal {
  width: 70%;
  min-height: 200px;
  position: absolute;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  z-index: 2;
  background: #fff;
  padding: 0px;
}
.header {
  background: gainsboro;
  padding: 15px;
  position: relative;
}
.close {
    position: absolute;
    right: 15px;
    top: 10px;
    padding:0;
    background: transparent;
    border:0;
}
.body {
  padding: 15px;
}
</style>