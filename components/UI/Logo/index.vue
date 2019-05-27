<template>
  <div v-bind:class="'logo ' + className" v-on:click="onClickEvent">
    <img v-bind:class="'logoImg'" alt="Logo"  v-bind:src="logoPath">
    <div class="circle" />
  </div>
</template>

<script>
export default {
  name: 'Logo',
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    }
  },
  props: {
    className: String,
    logoPath: String,
    width: Number,
    height: Number,
    onClick: Function
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
