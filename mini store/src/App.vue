<template>
  <div id="app">
  <div id="loading" v-if="loading">
  <img src="static/img/loading.jpg"/>
  </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

data(){
  return{
    loading:false,
  }

},

created(){
   this.$eventBus.$on("loading",payload=>{
     this.loading=payload;
   });
}

}
</script>

