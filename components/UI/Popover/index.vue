<script>
import Popper from 'popper.js'

const addEventListener = (element, controller, eventName) => {
  document.addEventListener ? element.addEventListener(eventName, controller, false) : element.attachEvent('on' + eventName, controller)
}

const deleteEventListener = (element, controller, eventName) => {
  document.removeEventListener ? element.removeEventListener(eventName, controller, false) : element.detachEvent('on' + eventName, controller)
}

export default {
  name: 'Popover',
  props: {
    // className: String,
    tagName: {
      type: String,
      default: 'div'
    },
    preventDefault: Boolean,
    stopPropagation: Boolean,
    appendToBody: {
      type: Boolean,
      default: false
    },
    transitionName: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    // reference: Object,
    forcePop: {
      type: Boolean,
      default: false
    },
    content: String,
    disabled: {
      type: Boolean,
      default: false
    },
    configs: {
      type: Object,
      default: () => { return {} }
    },
    mode: {
      type: String,
      default: 'hover',
      validator: value => ['click', 'hover'].includes(value)
    },
    popLocation: {
      type: String,
      default: 'bottom',
      validator: value => ['top', 'bottom', 'left', 'right'].includes(value)
    },
    offset: String,
    delayTimeIn: {
      type: Number,
      default: 10
    },
    delayTimeOut: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      popperJS: null,
      pop: false,
      popupConfigs: {
        placement: this.popLocation,
        modifiers: {
          offset: {
            offset: this.offset
          }
        }
      }
    }
  },
  watch: {
    pop (value) {
      if (value) {
        this.$emit('show', this)
        if (this.popperJS) {
          this.popperJS.enableEventListeners()
        }
        this.updatePopper()
      } else {
        if (this.popperJS) {
          this.popperJS.disableEventListeners()
        }
        this.$emit('hide', this)
      }
    },
    forcePop: {
      handler (value) {
        this[value ? 'popUp' : 'closeDown']()
      },
      immediate: true
    },
    disabled (value) {
      if (value) {
        this.pop = false
      }
    }
  },
  created () {
    this.popupConfigs = Object.assign(this.popupConfigs, this.configs)
  },
  mounted () {
    if (this.reference) this.popupTriggerElm = this.reference
    else if (this.$slots.trigger) this.popupTriggerElm = this.$slots.trigger[0].elm
    this.popupContentElm = this.$slots.default[0].elm
    if (this.mode === 'hover' && this.popupTriggerElm) {
      addEventListener(this.popupTriggerElm, this.onMouseOver, 'mouseover')
      addEventListener(this.popupTriggerElm, this.onMouseOver, 'focus')
      addEventListener(this.popupTriggerElm, this.onMouseOut, 'mouseout')
      addEventListener(this.popupTriggerElm, this.onMouseOut, 'blur')
      if (this.popupContentElm) {
        addEventListener(this.popupContentElm, this.onMouseOver, 'mouseover')
        addEventListener(this.popupContentElm, this.onMouseOver, 'focus')
        addEventListener(this.popupContentElm, this.onMouseOut, 'mouseout')
        addEventListener(this.popupContentElm, this.onMouseOut, 'blur')
      }
    }
    if (this.mode === 'click') {
      addEventListener(this.popupTriggerElm, this.showElm, 'click')
      addEventListener(document, this.onClickElm, 'click')
    }
  },
  destroyed () {
    this.destroyElm()
  },
  methods: {
    updatePopper () {
      this.popperJS ? this.popperJS.scheduleUpdate() : this.createPopper()
    },
    createPopper () {
      this.$nextTick(() => {
        if (this.visibleArrow) {
          this.appendArrow(this.contentElm)
        }
        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true
          document.body.appendChild(this.contentElm.parentElement)
        }
        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy()
        }
        this.popupConfigs.onCreate = () => {
          this.$emit('created', this)
          this.$nextTick(this.updatePopper)
        }
        this.popperJS = new Popper(this.popupTriggerElm, this.popupContentElm, this.popupConfigs)
      })
    },
    showElm (event) {
      if (this.stopPropagation) {
        event.stopPropagation()
      }
      if (this.preventDefault) {
        event.preventDefault()
      }
      if (!this.forcePop) {
        this.pop = !this.pop
      }
    },
    popUp () {
      this.pop = true
    },
    closeDown () {
      this.pop = false
    },
    destroyPopper () {
      if (this.pop) {
        return
      }
      if (this.popperJS) {
        this.popperJS.destroy()
        this.popperJS = null
      }
    },
    destroyElm () {
      if (this.popupContentElm) {
        deleteEventListener(this.popupContentElm, this.showElm, 'click')
        deleteEventListener(this.popupContentElm, this.closeDown, 'mouseup')
        deleteEventListener(this.popupContentElm, this.popUp, 'mousedown')
        deleteEventListener(this.popupContentElm, this.popUp, 'focus')
        deleteEventListener(this.popupContentElm, this.closeDown, 'blur')
        deleteEventListener(this.popupContentElm, this.onMouseOut, 'mouseout')
        deleteEventListener(this.popupContentElm, this.onMouseOver, 'mouseover')
      }
      deleteEventListener(document, this.onClickElm, 'click')
      this.pop = false
      this.destroyPopper()
    },
    onMouseOver () {
      clearTimeout(this.runningEvent)
      this.runningEvent = setTimeout(() => {
        this.pop = true
      }, this.delayTimeIn)
    },
    onMouseOut () {
      clearTimeout(this.runningEvent)
      this.runningEvent = setTimeout(() => {
        this.pop = false
      }, this.delayTimeOut)
    },
    onClickElm (e) {
      if (!this.$el || !this.popupContentElm ||
        this.checkIfExist(this.$el, e.target) ||
        this.checkIfExist(this.popupContentElm, e.target) ||
        !this.popupContentElm || this.checkIfExist(this.popupTriggerElm, e.target)
      ) {
        return
      }
      this.$emit('documentClick', this)
      if (this.forcePop) {
        return
      }
      this.pop = false
    },
    checkIfExist (elm, otherElm) {
      if (typeof elm.contains === 'function') {
        return elm.contains(otherElm)
      }
      return false
    }
  },
  render () {
    const TargetTag = this.tagName
    const slotContent = this.$slots.default
    const slotTrigger = this.$slots.trigger
    if (slotTrigger) this.triggerElm = slotTrigger[0]
    if (slotContent) this.contentElm = slotContent[0]
    return (
      <TargetTag>
        {this.triggerElm}
        <transition
          name={this.transitionName}
          enter-active-class={this.enterActiveClass}
          leave-active-class={this.leaveActiveClass}
          onAfter-leave={this.destroyPopper}
        >
          <span
            ref={this.popupContentElm}
            v-show={(!this.disabled && this.pop)}
          >
            {this.contentElm}{ this.content }
          </span>
        </transition>
      </TargetTag>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
