import { createRouter, createWebHistory } from 'vue-router'

import EmailView from '../views/template/EmailView.vue'
import ListPickupView from '../views/pickup/ListPickupView.vue'
import ListShipmentView from '../views/shipment/ListShipmentView.vue'
import ViewShipmentView from '../views/shipment/ViewShipmentView.vue'
import ViewPickupView from '../views/pickup/ViewPickupView.vue'
import UploadShipmentFileView from '../views/shipment/UploadShipmentFileView.vue'
import ListShipmentViewPicking from '../views/shipment/ListShipmentViewPicking.vue'
import ListShipmentViewSort from '../views/shipment/ListShipmentViewSort.vue'
import ViewShipmentTrackingView from '../views/shipment/ViewShipmentTrackingView.vue'
import ListShipmentViewSubmit from '../views/shipment/ListShipmentViewSubmit.vue'
import ListShipmentViewPick from '../views/shipment/ListShipmentViewPick.vue'
import ListFollowupPickupView from '../views/pickup/ListFollowupPickupView.vue'
import ListFollowupLoadingView from '../views/dispatch/ListFollowupLoadingView.vue'
import ViewLoadingView from '../views/dispatch/ViewLoadingView.vue'



import AddReceiveView from '../views/receive/AddReceiveView.vue'
import AddRouteView from '../views/route/AddRouteView.vue'
import AddNewRouteView from '../views/route/AddNewRouteView.vue'
import ListRouteView from '../views/route/ListRouteView.vue'
import ListSortView from '../views/sort/ListSortView.vue'
import ListDispatchView from '../views/dispatch/ListDispatchView.vue'
import AddNewSortView from '../views/sort/AddNewSortView.vue'
import ViewSortView from '../views/sort/ViewSortView.vue'
import MessageView from '../views/pickup/MessageView.vue'
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
        component: ListPickupView
      },
      {
        path: 'follow-up',
        component: ListFollowupPickupView
      },
      {
        path: 'pickup-detail/:id',
        component: ViewPickupView
      },
      
      
      {
        path: 'shipment-detail/:id',
        component: ViewShipmentView
      }
    ]
  }
  ,
  {
    path: '/dispatch',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: ListDispatchView
      },
      {
        path: 'follow-up',
        component: ListFollowupLoadingView
      },
      {
        path: 'load-detail/:id',
        component: ViewLoadingView
      },
      {
        path: 'shipment-detail/:id',
        component: ViewShipmentView
      }
    ]
  },
  {
    path: '/receive',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: AddReceiveView
      },
      {
        path: 'shipment-detail/:id',
        component: MessageView
      }
    ]
  },

  {
    path: '/shipment',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: ListShipmentView
      },
      {
        path: 'shipment-list-picking',
        component: ListShipmentViewPicking
      },
      {
        path: 'upload',
        component: UploadShipmentFileView
      },
      {
        path: 'shipment-list-sorted',
        component: ListShipmentViewSort
      },
      {
        path: 'shipment-list-picked',
        component: ListShipmentViewPick
      },
      {
        path: 'shipment-list-submitted',
        component: ListShipmentViewSubmit
      },
      
      {
        path: 'shipment-detail/:id',
        component: ViewShipmentView
      },
      {
        path: 'shipment-tracking/:id',
        component: ViewShipmentTrackingView
      }
    ]
  }
  ,
  
  {
    path: '/sort',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: ListSortView
      },
      {
        path: 'add-new',
        component: AddNewSortView
      },
      {
        path: 'sort-detail/:id',
        component: ViewSortView
      }
      
    ]
  },
  {
    path: '/delivery',
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
        path: 'delivery-detail/:id',
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

