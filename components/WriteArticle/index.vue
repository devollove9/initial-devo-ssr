<template>
  <div class="WriteArticle">
    <div class="container">
      <div class="topEditor">
        <div class="topLeftEditor">
          <button @click="upLoadMyArticle">Post/Update</button>
          <p>ArticleId: {{ articleId }}</p>
          <input v-model="articleId" placeholder="articleId">
          <button @click="getArticle">Load</button>
          <p>Title: {{ title }}</p>
          <input v-model="title" placeholder="title">
          <p>Author: {{ authorName }}</p>
          <input v-model="authorName" placeholder="author">
          <p>ViewCount: {{ viewCount }}</p>
          <input v-model="viewCount" placeholder="ViewCount">
          <p>UniqueViewCount: {{ uniqueViewCount }}</p>
          <input v-model="uniqueViewCount" placeholder="UniqueViewCount">
          <p>Publish Date: {{ publishDate }}</p>
          <input v-model="publishDate" placeholder="">
          <p>Update Date: {{ updateDate }}</p>
          <input v-model="updateDate" placeholder="">
          <p>Change Content?: {{ changeContent }}</p>
          <input v-model="changeContent" placeholder="Change Content">
        </div>
        <div class="middleEditor">
          Categories:
          <div class="toAddCategories" v-for="(item, i) in toAddCategory" :key="i">
            <Category :categoryInfo="item" />
          </div>
        </div>
        <div class="topRightEditor">
          <div>
            <div class="addCategories" v-for="(item, i) in categoryInfo" :key="i">
              <Category :categoryInfo="item" />
              <button @click="addOrRemoveCategory(item)">Add/Remove</button>
            </div>
          </div>
          <input v-model="categoryName" placeholder="Category Name">
          <input v-model="categoryNameCN" placeholder="Category Name CN">
          <button @click="addArticleCategory">Add Category</button>
        </div>
      </div>
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
import Category from '~/components/Article/Category'
import hljs from 'highlight.js'
import ArticleApi from '~/services/api/ArticleApi'
import ArticleCategoryApi from '~/services/api/ArticleCategoryApi'
import ArticleToCategoryApi from '~/services/api/ArticleToCategoryApi'

const findItemIdx = (itemArray, target) => {
  for (let i = 0; i < itemArray.length; i++) {
    if (itemArray[i].articleCategoryId === target) {
      return i
    }
  }
  return -1
}

export default {
  components: {
    Category
  },
  props: {
    categoryInfo: Array
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
      toAddCategory: [],
      categoryName: '',
      categoryNameCN: '',
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
    async addOrRemoveCategory (category) {
      if (this.articleId) {
        const idx = findItemIdx(this.toAddCategory, category.articleCategoryId)
        let res
        if (idx < 0) {
          res = await ArticleToCategoryApi.postInfo(
            { articleId: this.articleId, articleCategoryId: category.articleCategoryId })
        } else {
          res = await ArticleToCategoryApi.deleteInfo(
            { articleId: this.articleId, articleCategoryId: category.articleCategoryId })
        }
        if (!res.data) {
          console.log(res.error)
          alert(res.error)
        } else {
          // console.log("Upload Success")
          this.getArticle()
          if (idx < 0) alert('Article Category Add Success')
          if (idx >= 0) alert('Article Category Remove Success')
        }
      }
    },
    async addArticleCategory () {
      if (this.categoryName && this.categoryNameCN) {
        const res = await ArticleCategoryApi.postInfo({ name: this.categoryName, nameCN: this.categoryNameCN })
        if (!res.data) {
          console.log(res.error)
          alert(res.error)
        } else {
          // console.log("Upload Success")
          alert('Category Add Success')
        }
      }
    },
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
        newA.categories = this.toAddCategory.map((c) => {
          return c.articleCategoryId
        })
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
          this.toAddCategory = res.data[0].categories
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
