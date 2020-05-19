<template>
<div>
<h1 class="fleft">{{product.name}}</h1>
<router-link  to="/shopingProducts" class="fright">All Products</router-link/>
<div class="clear"></div>
<hr>
<div class="product-left">
<img :src="'http://localhost/blog/public/products/'+ product.image"/>
</div>
<div class="product-right">
<div class="product-description">
<p>
<strong>Price:</strong>&#2547;{{product.price}}<br><br>
<strong>Description:</strong>{{product.description}}<br><br>
</p>
<strong>Quantity:</strong>
<input type="number" class="input-number" v-model="qty"/>
<button class="addBtn" @click="addToCart">Add to cart</button>
</div>
</div>
</div>
  
</template>

<script type="text/javascript">
export default {
  name: 'shopingProducts',
  data(){
      return{
          Products:[],
          qty:1,
          product:{

          }
      }
  },
  mounted(){
    this.id=this.$route.params.pid;
    this.init();
  },
  methods:{
           init(){
    let token=localStorage.getItem("Token");

  axios.post('/showProduct',{
      access_token: token,
      id:this.id
  })
  .then(response=>{
      
   this.product=response.data;
   
    })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'Something went wrong',
     });

    });             
          
           },
    addToCart(){
      this.$store.commit("addToCart",{ 
       product: this.product,
       qty:this.qty,
        
        });
    }       
  }
 
  
}
</script>

