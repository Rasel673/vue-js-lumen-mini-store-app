<template>
  <div class="admin">
    
    <div id="header">
    <h1 class="fleft">Ecommerce</h1>
    <h1 class="fright"><a href="#" @click="logout()">Logout</a></h1>
    </div>
    <sidebar></sidebar>
    <div id="main">
    <router-view/>
    </div>
  
  </div>
</template>

<script>
import sidebar from '../../others/LeftsideBar.vue'
export default {
  name: 'admin',
  data () {
    return {
      
     
    }
  },
  mounted(){
var token=localStorage.getItem("Token");
if(!token){
  this.$eventBus.$emit("loading",false);
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
     sidebar
   }   
}
</script>

