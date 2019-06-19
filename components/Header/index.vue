<template>
  <div :key="componentKey" class="Header">
    <header class="header">
      <div class="header-container">
        <Logo className="logo" :logoPath="require('~/assets/logo.png')" :onClick="onClickLogo" />
        <div class="menu">
          <el-menu :router="true" :default-active="activeMenu" class="el-menu-demo" mode="horizontal" @select="handleMenuSelect">
            <el-menu-item index="/">{{ $t('header.menu.home') }}</el-menu-item>
            <el-menu-item index="/post">{{ $t('header.menu.post') }}</el-menu-item>
            <el-submenu index="product">
              <template slot="title">{{ $t('header.menu.product') }}</template>
              <el-menu-item index="product-1">1</el-menu-item>
              <el-menu-item index="product-2">2</el-menu-item>
              <el-menu-item index="product-3">3</el-menu-item>
              <el-submenu index="product-4">
                <template slot="title">4</template>
                <el-menu-item index="product-4-1">1</el-menu-item>
                <el-menu-item index="product-4-2">2</el-menu-item>
                <el-menu-item index="product-4-3">3</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item v-t="'header.menu.resource'" index="/resource" />
            <el-menu-item index="/aboutme">{{ $t('header.menu.about') }}</el-menu-item>
          </el-menu>
        </div>
        <div :class="'menuIconAll'">
          <IconDropDown
            trigger="click"
            className="menuIcon"
            :srcPath="require('@/assets/icon/icons8-menu-grey-darker.svg')"
            :onSelect="onSelectMenuIcon"
            :items="menuItems"
            :w="35"
            :h="35"
          />
        </div>
        <div :class="'switchLanguage'">
          <TextDropDown :defaultVal="activeLocale" :onSelect="onSelectLocale" :items="languageLocales" />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import { Logo, TextDropDown, IconDropDown } from '~/components/UI'

const localeOptions = [
  { key: 'en-US', value: 'English' },
  { key: 'zh-CN', value: '中文' }
]

export default {
  components: {
    TextDropDown,
    IconDropDown,
    Logo
  },
  data () {
    const initialLocale = this.$store.getters.getActiveLocale
    return {
      activeLocale: this.getLanguageLocaleContent(initialLocale),
      activeMenu: this.$route.path,
      componentKey: 0,
      languageLocales: localeOptions,
      menuItems: [
        { key: 'home', value: 'header.menu.home' },
        { key: 'product', value: 'header.menu.product' },
        { key: 'post', value: 'header.menu.post' },
        { key: 'resource', value: 'header.menu.resource' },
        { key: 'about', value: 'header.menu.about' }
      ]
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
    getLanguageLocaleContent (k) {
      for (const idx in localeOptions) {
        if (localeOptions[idx].key === k) {
          return localeOptions[idx].value
        }
      }
      return 'English'
    },
    onSelectLocale (e) {
      const payload = {
        target: this.$i18n,
        activeLocale: e
      }
      this.$store.commit('changeLocale', payload)
    },
    onSelectMenuIcon (e) {
      this.$router.push(e)
    },
    onClickLogo (e) {
    },
    handleMenuSelect (e) {
      // await this.$router.push(e)
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
