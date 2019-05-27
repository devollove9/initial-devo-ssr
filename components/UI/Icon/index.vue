<template>
  <div v-bind:class="'icon ' + className" v-bind:style="{width:w +'px', height:h + 'px'}" v-on:click="onClickEvent">
    <img v-bind:class="'iconImg'" alt="Icon"  v-bind:src="srcPath" />
  </div>
</template>

<script>
export default {
  name: 'Icon',
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    }
  },
  props: {
    className: String,
    srcPath: String,
    w: Number,
    h: Number,
    onClick: Function
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
