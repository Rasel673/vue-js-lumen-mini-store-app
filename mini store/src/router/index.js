import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/pages/login'
import Admin from '@/components/pages/admin/Admin'
import Category from '@/components/pages/admin/Category'
import Modal from '@/components/others/modal'
import Suplier from '@/components/pages/admin/Suplier'
import Product from '@/components/pages/admin/Product'
import Shop from '@/components/pages/shop/Shop'
import shopingProducts from '@/components/pages/shop/shopingProducts'
import singleProduct from '@/components/pages/shop/singleProduct'





Vue.component("modal",Modal);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: {path:'login'}
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: {path:'/admin/Category'},
      children:[
        {
          path:'Category',
          name:'adminCategory',
          component:Category
        },

        {
          path:'Suplier',
          name:'adminSuplier',
          component:Suplier
        },
        {
          path:'product',
          name:'adminProduct',
          component:Product
        },


      ]
    },
    {
      path: '/shop',
      name: 'shop',
      component:Shop,
      redirect: {path:'shopingProducts'},
      children:[

        {
          path:'/shopingProducts',
          name:'shopingProducts',
          component:shopingProducts,
        },
        {
          path:'/Product/:pid',
          name:'singleProduct',
          component:singleProduct,
        },
      ]
    },

  ]
})
