import { createRouter, createWebHistory } from 'vue-router'

import EmailView from '../views/template/EmailView.vue'
import HomeView from '../views/HomeView.vue'
import ShipmentView from '../views/ShipmentView.vue'
import AddRouteView from '../views/route/AddRouteView.vue'
import ListRouteView from '../views/route/ListRouteView.vue'
import MessageView from '../views/MessageView.vue'
import LoginView from '../views/LoginView.vue'
// import PageNotFound from '../views/PageNotFound.vue'

import { useUserStore } from '@/stores/user-store'

const routes = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/pickup',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: HomeView
      },
      {
        path: 'shipment-detail/:id',
        component: MessageView
      }
    ]
  }
  ,
  {
    path: '/shipment',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: ShipmentView
      },
      {
        path: 'shipment-detail/:id',
        component: MessageView
      }
    ]
  }
  ,
  {
    path: '/route',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: ListRouteView
      },
      {
        path: 'route-detail/:id',
        name: 'products.show',
        component: AddRouteView
      }
    ]
  }
  // ,
  // { 
  //   path: '*', 
  //   component: PageNotFound
  // }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
//process.env.BASE_URL
export default router

