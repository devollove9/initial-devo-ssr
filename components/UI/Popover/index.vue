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
    className: String,
    tagName: {
      type: String,
      default: 'div'
    },
    preventDefault: Boolean,
    stopPropagation: Boolean,
    transitionName: String,
    enterActiveClass: String,
    leaveActiveClass: String,
    reference: Object,
    content: String,
    disabled: Boolean,
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
    offSet: Number,
    delayTime: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      referenceElm: null,
      popperJS: null,
      pop: false,
      currentPlacement: '',
      options: {}
    }
  },
  created () {
  },
  mounted () {
    console.log(this.$scopedSlots.triggerRef.call())
    if (this.reference) this.popupTriggerElm = this.reference
    else if (this.triggerElm) this.popupTriggerElm = this.$scopedSlots.triggerRef.call()[0].elm
    if (this.contentElm) this.popupContentElm = this.$scopedSlots.contentRef.call()[0].elm
    console.log(this.popupTriggerElm)
    if (this.mode === 'hover' && this.popupContentElm && this.popupTriggerElm) {
      addEventListener(this.popupTriggerElm, this.onMouseOver, 'mouseover')
      addEventListener(this.popupTriggerElm, this.onMouseOver, 'focus')
      addEventListener(this.popupTriggerElm, this.onMouseOut, 'mouseout')
      addEventListener(this.popupTriggerElm, this.onMouseOut, 'blur')

      addEventListener(this.popupContentElm, this.onMouseOver, 'mouseover')
      addEventListener(this.popupContentElm, this.onMouseOver, 'focus')
      addEventListener(this.popupContentElm, this.onMouseOut, 'mouseout')
      addEventListener(this.popupContentElm, this.onMouseOut, 'blur')
    }
    if (this.mode === 'click') {
      addEventListener(this.popupTriggerElm, this.onMouseOut, 'mouseout')
      addEventListener(document, this.onMouseOut, 'blur')
    }
    // this.referenceElm = this.reference || this.$slots.reference[0].elm
    // this.popper = this.$slots.default[0].elm
    /*
    switch (this.trigger) {
      case 'click':
        on(this.referenceElm, 'click', this.doToggle);
        on(document, 'click', this.handleDocumentClick);
        break;
      case 'hover':
        on(this.referenceElm, 'mouseover', this.onMouseOver);
        on(this.referenceElm, 'focus', this.onMouseOver);
        on(this.popper, 'mouseover', this.onMouseOver);
        on(this.popper, 'focus', this.onMouseOver);
        on(this.referenceElm, 'mouseout', this.onMouseOut);
        on(this.referenceElm, 'blur', this.onMouseOut);
        on(this.popper, 'mouseout', this.onMouseOut);
        on(this.popper, 'blur', this.onMouseOut);
        break;
    }
    */
  },
  destroyed () {
    this.destroyPopper()
  },
  methods: {
    createPopper () {
      this.$nextTick(() => {
        if (this.visibleArrow) {
          this.appendArrow(this.popper)
        }
        if (this.appendToBody && !this.appendedToBody) {
          this.appendedToBody = true
          document.body.appendChild(this.popper.parentElement)
        }
        if (this.popperJS && this.popperJS.destroy) {
          this.popperJS.destroy()
        }
        this.popperOptions.onCreate = () => {
          this.$emit('created', this)
          this.$nextTick(this.updatePopper)
        }
        this.popperJS = new Popper(this.referenceElm, this.popper, this.popperOptions)
      })
    },
    popUp () {
      this.pop = true
    },
    closeDown () {

    },
    doDestroy () {
      console.log('In doDestroy')
      if (this.pop) {
        return
      }
      if (this.popperJS) {
        this.popperJS.destroy()
        this.popperJS = null
      }
    },
    destroyPopper () {
      deleteEventListener(this.popupTriggerElm, 'mouseup', this.doClose)
      deleteEventListener(this.referenceElm, 'mousedown', this.doShow)
      deleteEventListener(this.referenceElm, 'focus', this.popUp)
      deleteEventListener(this.referenceElm, 'blur', this.doClose)
      deleteEventListener(this.referenceElm, 'mouseout', this.onMouseOut)
      deleteEventListener(this.referenceElm, 'mouseover', this.onMouseOver)
      deleteEventListener(document, 'click', this.handleDocumentClick)
      this.pop = false
      this.doDestroy()
    },
    onMouseOver () {
      console.log('asd')
      clearTimeout(this.runningEvent)
      this.runningEvent = setTimeout(() => {
        this.pop = true
      }, this.delayTime)
    },
    onMouseOut () {
      clearTimeout(this.runningEvent)
      this.runningEvent = setTimeout(() => {
        this.pop = false
      }, this.delayTime)
    }
  },
  render () {
    const TargetTag = this.tagName
    const slotContent = this.$scopedSlots.contentRef
    const slotTrigger = this.$scopedSlots.triggerRef
    if (slotTrigger) this.triggerElm = slotTrigger.call()
    if (slotContent) this.contentElm = slotContent.call()
    return (
      <TargetTag>
        <transition
          name={this.transitionName}
          enter-active-class={this.enterActiveClass}
          leave-active-class={this.leaveActiveClass}
          onAfter-leave="doDestroy"
        >
          <span
            ref={this.popper}
            v-show={!this.disabled && this.pop}
          >
            {this.contentElm}{ this.content }
          </span>
        </transition>
        {this.triggerElm}
      </TargetTag>
    )
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
