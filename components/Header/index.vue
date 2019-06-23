<script>
import i18n from '~/libs/i18n'
import localeMessage from './index.i18n.js'
import { Logo, TextDropDown, IconDropDown } from '~/components/UI'
import UserPanel from '~/components/Header/UserPanel'

export default {
  components: {
    TextDropDown,
    IconDropDown,
    Logo
  },
  data () {
    return {
      activeMenu: this.$route.path,
      componentKey: 0,
      menuItems: [
        { key: 'home', value: 'header.menu.home' },
        { key: 'post', value: 'header.menu.post' },
        { key: 'product', value: 'header.menu.product' },
        { key: 'resource', value: 'header.menu.resource' },
        { key: 'about', value: 'header.menu.about' },
        { key: 'signin', value: 'header.menu.signin' }
      ]
    }
  },
  computed: {
    isAuthenticated () {
      return this.$store.state.user.authenticated
    }
  },
  async beforeCreate () {
    await i18n(localeMessage, this.$store)
  },
  methods: {
    onSelectMenuIcon (e) {
      if (e === 'home') e = '/'
      this.$router.push(e)
    },
    onClickLogo (e) {
      this.$store.commit('signOutUser')
      this.$router.push('/')
    },
    handleMenuSelect (e) {
      // await this.$router.push(e)
    }
  },
  render () {
    return (
      <div key="componentKey" class="Header">
        <header class="header">
          <div class="header-container">
            <Logo className="logoHeader" onClick={this.onClickLogo}/>
            <div class="menu">
              <el-menu router={true} default-active={this.activeMenu} class="el-menu-demo" mode="horizontal" onSelect={this.handleMenuSelect}>
                <el-menu-item index="/">{ this.$t('header.menu.home') }</el-menu-item>
                <el-menu-item index="/post">{ this.$t('header.menu.post') }</el-menu-item>
                <el-submenu index="product">
                  <template slot="title">{ this.$t('header.menu.product') }</template>
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
                <el-menu-item v-t={ this.$t('header.menu.resource') } index="/resource" />
                <el-menu-item index="/aboutme">{ this.$t('header.menu.about') }</el-menu-item>
              </el-menu>
            </div>
            {!this.isAuthenticated && <div class="menuIconAll">
              <IconDropDown
                trigger="click"
                className="menuIcon"
                onSelect={this.onSelectMenuIcon}
                items={this.menuItems}
                srcPath="/icon/icons8-menu-grey-darker.svg"
                w={33}
                h={33}
              />
            </div>}
            <div class="userPanelHeader">
              <UserPanel />
            </div>
          </div>
        </header>
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
