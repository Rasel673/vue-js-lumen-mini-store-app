<template>
<div>
<h2>Latest Products</h2>
<hr>
<div class="product"  v-for="product in Products">
<router-link   :to="'/Product/'+product.id">
<div class="productContainer">
<img  :src="'http://localhost/blog/public/products/'+ product.image" alt="Product Image">
<strong>{{product.name}}</strong>
<p class="price">&#2547;{{product.price}}</p>
</div>
</router-link/>
</div>
</div>
  
</template>

<script type="text/javascript">
export default {
  name: 'shopingProducts',
  data(){
      return{
          Products:[]
      }
  },
  mounted(){
    
    this.init();
  },
  methods:{
           init(){
            

  axios.get('/allProduct')
  .then(response=>{
   this.Products=response.data;
    })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'Something went wrong',
     });

    });             
           }
  }
 
  
}
</script>

