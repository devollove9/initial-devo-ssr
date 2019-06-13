<template>
  <div>
    <div>
      <div class="md-subhead">
        <span>01 Example (theme snow)</span>
      </div>
    </div>
    <button @click="upLoadMyArticle">test</button>
    <p>Title</p>
    <input v-model="title" placeholder="title">
    <p>Author</p>
    <input v-model="authorName" placeholder="author">
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
        content: this.editor.root.innerHTML,
        userId: '000003f6b5132ccdfb906d',
        title: this.title,
        authorName: this.authorName
      }
      const res = await ArticleApi.postInfo(newA)
      if (!res.data) console.log(res.error)
      // else console.log("Upload Success")
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
