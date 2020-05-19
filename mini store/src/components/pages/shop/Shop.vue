<template>
  <div class="admin">
    <div id="header">
    <h1 class="fleft">Ecommerce</h1>
    <h1 class="fright">
    <router-link to="/admin">Dashboard</router-link>
    </h1>
    </div>
    
    <div id="shop">
    <div id="shopContainer">
    <router-view/>
    </div>

    <div id="cart">
    <Cart></Cart>
    
    </div>
    
    </div>
  
  </div>
</template>

<script>
import Cart from '../../others/cart.vue'
export default {
  name: 'Shop',
  data () {
    return {
      
      cart:[]
    }
  },
  mounted(){
var token=localStorage.getItem("Token");
if(!token){
   this.$router.push({name:"login"});
}


  },

   methods:{
       logout(){
         localStorage.setItem("Token","");
         this.$router.push({name:"login"});
       }

      },

  
   components:{
    Cart

   }  
}
</script>

