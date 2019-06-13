<template>
  <div>
    <WriteArticle />
  </div>
</template>

<script>
import WriteArticle from '~/components/WriteArticle'

export default {
  components: {
    WriteArticle
  }
}
</script>

<style lang="scss" scoped>
  .quill-code {
    border: none;
    height: auto;
    > code {
      width: 100%;
      margin: 0;
      padding: 1rem;
      border: 1px solid #ccc;
      border-top: none;
      border-radius: 0;
      height: 10rem;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>
