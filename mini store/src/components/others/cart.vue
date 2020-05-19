<template>
  <div id="cartContainer">
    <h2>{{myApp}}</h2>
    <hr>
    <table class="cart">
    <tr>
    <th>Product</th>
    <th>Quantity</th>
    <th>Price</th>
    
</tr>
<tr>
<td colspan="4"><hr></td>
</tr>
<tr>
<tr v-for="(item,index) in cart" class="txt-center">
<td>{{item.product.name}}</td>
<td><input type="number" class="input-number" v-model="item.qty"/></td>
<td>&#2547;{{item.product.price*item.qty}}<td/>
<td><button @click="remove(index)" id="remove">x</button></td>
</tr>
<tr>
<td colspan="4"><hr></td>
</tr>
<tr>
<td></td>
<td>Total</td>
<td>&#2547;{{total}}</td>
<td></td>
</tr>

</table>

<br/><br/>
<p class="txt-center">
<router-link to="/checkout" class="addBtn">check out</router-link>
</p>

    </div>

</template>

<script type="text/javascript">
export default {
  name: 'Cart',

   data () {
    return {
      
  
    }
  },
    computed:{
        cart(){
    return this.$store.getters.getCart;
  },
    myApp(){
    return this.$store.getters.getAppName;
  },

   total(){
    return this.$store.getters.getTotal;
  }
     },
  methods:{
    remove(index){
      this.$store.commit("removeCart",index);
    }
  }   
  
}
</script>

