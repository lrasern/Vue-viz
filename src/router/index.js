import Vue from 'vue'
import Router from 'vue-router'
import CountrySelector from '@/components/CountrySelector'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'CountrySelector',
      component: CountrySelector
    }
  ]
})
