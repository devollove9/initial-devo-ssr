<template>
  <div class="error-500">
    <h1>Something went wrong</h1>
  </div>
</template>
<script>
export default {
  name: 'error-404',
  props: {
    error: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
