<template>
  <div class="user-center">
    <Header />
    <div class="container">
      <div class="navigation"><UserCenterNavigation /></div>
      <div class="content"><nuxt /></div>
    </div>
    <Footer />
  </div>
</template>
<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
import UserCenterNavigation from '~/components/UserCenterNavigation'

export default {
  components: {
    Header,
    Footer,
    UserCenterNavigation
  }
}
</script>
<style lang="scss">
.user-center{
  padding-top: $header-distance;
  padding-bottom: $bottom-distance;
  height: 100%;
  .container {
    margin: 0 auto;
    padding: 50px 10px 30px 10px;
    max-width: 1200px;
    display: flex;
    .navigation {
      height: 100%;
    }
    .content {
      height: 100%;
      flex: 1;
      margin-left: 50px;
    }
  }
}
</style>
