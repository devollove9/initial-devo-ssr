<template>
  <div class="WriteArticle">
    <div class="container">
      <button @click="upLoadMyArticle">Post</button>
      <p>Title: {{ title }}</p>
      <input v-model="title" placeholder="title">
      <p>Author: {{ authorName }}</p>
      <input v-model="authorName" placeholder="author">
      <p>ArticleId: {{ articleId }}</p>
      <input v-model="articleId" placeholder="articleId">
      <p>ViewCount: {{ viewCount }}</p>
      <input v-model="viewCount" placeholder="ViewCount">
      <p>UniqueViewCount: {{ uniqueViewCount }}</p>
      <input v-model="uniqueViewCount" placeholder="UniqueViewCount">
      <p>Publish Date: {{ new Date(publishDate) }}</p>
      <input v-model="publishDate" placeholder="">
      <p>Update Date: {{ new Date(updateDate) }}</p>
      <p>Change Content?: {{ changeContent }}</p>
      <input v-model="changeContent" placeholder="Change Content">
      <button @click="getArticle">Load</button>
      <div class="quill-editor-example">
        <div
          v-model="content"
          class="quill-editor"
          v-quill:myQuillEditor="editorOption"
          @blur="onEditorBlur($event)"
          @focus="onEditorFocus($event)"
          @ready="onEditorReady($event)"
        >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js'
import ArticleApi from '~/services/api/ArticleApi'
export default {
  components: {
  },
  data () {
    return {
      name: '01-example',
      authorName: '',
      title: '',
      articleId: '',
      viewCount: 0,
      uniqueViewCount: 0,
      changeContent: '',
      publishDate: 0,
      updateDate: 0,
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editorOption: {
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'align': [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          }
        }
      }
    }
  },
  computed: {
    editor () {
      return this.myQuillEditor
    },
    contentCode () {
      return hljs.highlightAuto(this.content).value
    }
  },
  mounted () {
    console.log('this is my editor', this.editor)
    setTimeout(() => {
      this.content = ''
    }, 1300)
  },
  methods: {
    async upLoadMyArticle () {
      const newA = {
        title: this.title,
        authorName: this.authorName
      }
      let res = {}
      if (this.articleId !== '') {
        newA.articleId = this.articleId
        newA.viewCount = this.viewCount
        newA.publishDate = this.publishDate
        newA.uniqueViewCount = this.uniqueViewCount
        if (this.changeContent !== '') {
          newA.content = this.editor.root.innerHTML
        }
        res = await ArticleApi.putInfo(newA)
      } else {
        newA.userId = '000003f6b5132ccdfb906d'
        newA.content = this.editor.root.innerHTML
        res = await ArticleApi.postInfo(newA)
      }
      if (!res.data) {
        console.log(res.error)
        alert(res.error)
      } else {
        // console.log("Upload Success")
        if (this.articleId !== '') alert('Edit Success')
        if (this.articleId === '') alert('Post Success')
      }
    },
    async getArticle () {
      if (this.articleId !== '') {
        const newA = {
          articleId: this.articleId
        }
        const res = await ArticleApi.getInfo(newA)
        if (!res.data) {
          console.log(res.error)
          alert(res.error)
        } else {
          this.title = res.data[0].title
          this.articleId = res.data[0].articleId
          this.authorName = res.data[0].authorName
          this.viewCount = res.data[0].viewCount
          this.publishDate = res.data[0].publishDate
          this.updateDate = res.data[0].updateDate
          this.uniqueViewCount = res.data[0].uniqueViewCount
          this.content = res.data[0].content
        }
      }
    },
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
  .quill-editor {
    max-height: 600px;
    overflow-y: auto;
  }
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
      height: 1000px;
      overflow-y: auto;
      resize: vertical;
    }
  }
</style>
