import Vue from 'vue'
import state from '~/state/state'

export default (ctx, inject) => {
  ctx.$store = Vue.observable(state())
  inject('store', ctx.$store)
}
