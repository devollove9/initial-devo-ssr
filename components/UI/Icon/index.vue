<template>
  <div :class="'icon ' + className" :style="{width:w +'px', height:h + 'px'}" :click="onClickEvent">
    <img :class="'iconImg'" alt="Icon" :src="srcPath"></img>
  </div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    className: String,
    srcPath: String,
    w: Number,
    h: Number,
    onClick: Function
  },
  methods: {
    onClickEvent (e) {
      if (this.onClick) {
        this.onClick(e)
      }
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
