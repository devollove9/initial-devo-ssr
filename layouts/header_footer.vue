<template>
  <div class="main-container">
    <Header />
    <nuxt />
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>
<style lang="scss">
  .main-container{
    position: relative;
    padding-top: $header-distance;
    padding-bottom: $bottom-distance;
    min-height: 100%;
  }
</style>
