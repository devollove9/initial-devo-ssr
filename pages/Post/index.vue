<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

import { Card } from '@/components/UI'

import i18n from '@/libs/i18n'
import localeMessage from './index.i18n.js'

export default {
  name: 'Post',
  components: {
  },
  data () {
    return {
      textColor: 'red'
    }
  },
  beforeCreate () {
    i18n(localeMessage, this.$store)
  },
  methods: {
    testAAA () {
      this.textColor = 'orange'
    }
  },
  render () {
    return (
      <div class="Post">
        <Header />
        <div class="container">
          <Card className="Card111">
            <div class="content">
              <div class="Title">
                How to quickly understand java
              </div>
            </div>
            <div onClick={this.testAAA} class="description" style={ { color: this.textColor } }>
              Posted: 05/21/2019 Author: Devo View Count: 1 <br/>Tags: News, Sport, Economic
            </div>
          </Card>
          <div class="Card">
            <div class="content">
              <div class="Title">
                How to quickly understand java
              </div>
            </div>
            <div class="description">Posted: 05/21/2019 Author: Devo View Count: 1 <br/>Tags: News, Sport, Economic
            </div>
          </div>
          <div class="Card">
            <div class="content">
              <div class="Title">
                How to quickly understand java
              </div>
            </div>
            <div class="description">Posted: 05/21/2019 Author: Devo View Count: 1 <br/>Tags: News, Sport, Economic
            </div>
          </div>
          <div class="Card">
            <div class="content">
              <div class="Title">
                How to quickly understand java
              </div>
            </div>
            <div class="description">Posted: 05/21/2019 Author: Devo View Count: 1 <br/>Tags: News, Sport, Economic
            </div>
          </div>
          <div class="Card">
            <div class="content">
              <div class="Title">
                How to quickly understand java
              </div>
            </div>
            <div class="description">Posted: 05/21/2019 Author: Devo View Count: 1 <br/>Tags: News, Sport, Economic
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
