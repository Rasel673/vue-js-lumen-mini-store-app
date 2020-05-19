<template>
<div id="sidebar">
    <ul class="nav">
    <li>
    <router-link to="/admin/Category">Category</router-link>
    </li>
    <li>
    <router-link to="/admin/Suplier">Supplier</router-link>
    </li>
    
    <li>
    <router-link to="/admin/Product">Product</router-link>
    </li>
    <li>
    <router-link to="/shop">Shop</router-link>
    </li>
    </ul>
    </div>
 
</template>

<script type="text/javascript">
export default {
  name: 'sidebar',

   data () {
    return {
      
     
    }
  },
  
}
</script>

