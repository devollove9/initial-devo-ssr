<template>
  <div class="nuxt-error">
    <component :is="errorPage" :error="error" />
  </div>
</template>
<script>
import NotFound from '~/pages/NotFound'
export default {
  name: 'nuxt-error',
  layout: 'default', // optional
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    errorPage () {
      if (this.error.statusCode === 404) {
        return NotFound
      }
      // catch everything else
      return NotFound
    }
  }
}
</script>
