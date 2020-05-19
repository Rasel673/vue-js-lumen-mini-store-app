    
<template>
  <div class="Category">
  <!-- Add category modal -->
  <modal modalHeading="Add new product" :cond="showingModal"  @close="showingModal=false">
  <table>
  <tr>
  <td>Product Name:</td>
  <td><input type="text" placeholder="Enter name" id="newCatname" v-model="newProduct.name"/></td>

  </tr>
  <tr>
  <td>Product Supplier:</td>
  <td>
  <select v-model="newProduct.supplier" >
  <option value="" selected>--select one--</option>
  <option v-for="supplier in Suppliers" :value="supplier.id">{{supplier.name}}</option>
  </select>
  </td>
</tr>
<tr>
  <td>Product Category:</td>
  <td>
  <select  v-model="newProduct.category">
  <option value="">--select one--</option>
  <option v-for="category in Categories" :value="category.id">{{category.name}}</option>
  </select>
  </td>
</tr>
<tr>
  <td>Product Price:</td>
  <td><input type="text" v-model="newProduct.price"/></td>
</tr>
<tr>
  <td>Product Image:</td>
  <td>
  <input type="file" id="image" @change="imgview" accept="image/*"/>


  </td>
</tr>
<tr>
  <td></td>
  <td>
  <progress :value="percent" max="100" v-if="percent!=0 && percent!=100"></progress>
  <span v-if="percent!=0 && percent!=100"></span>
  <img :src="newProduct.image" class="thumbnile" alt="product image" v-model="newProduct.image" />
  </td>
</tr>
<tr>
  <td>Product description:</td>
  <td><textarea  placeholder="Write short description....." v-model="newProduct.description"></textarea></td>
</tr>

  <tr>
  <td></td>
  <td><button class="btnSave"  @click="addProduct()">save</button></textarea></td>

  </tr>
  </table>
  </modal>
 <!-- Edit category modal -->
   <modal modalHeading="Update  Product" :cond="editModal"  @close="editModal=false,upImage=false">
  <table>
  <tr>
  <td>Product Name:</td>
  <td><input type="text" placeholder="Enter name"  v-model="updateProduct.name"/></td>
  </tr>
  <tr>
  <td>Product Supplier:</td>
  <td>
  <select v-model="updateProduct.sup_id" >
  <option value="" selected>--select one--</option>
  <option v-for="supplier in Suppliers" :value="supplier.id">{{supplier.name}}</option>
  </select>
  </td>
</tr>
<tr>
  <td>Product Category:</td>
  <td>
  <select  v-model="updateProduct.cat_id">
  <option value="">--select one--</option>
  <option v-for="category in Categories" :value="category.id">{{category.name}}</option>
  </select>
  </td>
</tr>
<tr>
  <td>Product Price:</td>
  <td><input type="text" v-model="updateProduct.price"/></td>
</tr>
<tr>
  <td>Product Image:</td>
  <td>
  <input type="file" id="image" @change="imgupdate" accept="image/*"/>
</td>
</tr>
<tr v-if="upImage==true">
 <td>New Photo:</td>
  <td>
  <img :src="upPic" class="thumbnile" alt="product image" v-model="updateProduct.image" />
  </td>
  </tr>
  <tr>
<td>Old Photo:</td>
  <td>
  <img :src="'http://localhost/blog/public/products/'+updateProduct.image" class="thumbnile" alt="product image" />
  </td>
</tr>
<tr>
  <td>Product description:</td>
  <td><textarea  placeholder="Write short description....." v-model="updateProduct.description"></textarea></td>
</tr>

  <tr>
  <td></td>
  <td><button class="btnSave"  @click="editProduct()">save</button></textarea></td>

  </tr>
  </table>
  </modal>

  <!-- delete Product  modal-->
<modal modalHeading="Are you Sure??" :cond="deleteModal"  @close="deleteModal=false">
  <table>
  <tr>
  <td></td>
  <td><h3>You are going to delete "{{deleteProduct.name}}"?</h3></td>
  
  </tr>
  <tr>
  <td></td>
  <td></td>

  </tr>
  <tr>
  
  <td><button class="addBtn" @click="dltproduct()">yes</button></td>
  <td><button class="btnClose"  @click="deleteModal=false">no</button></td>
</tr>
  </table>
  </modal>
<!-- All category  table-->
    <h1 class="fleft">Products</h1>
    <button class="addBtn fright" @click="showingModal=true">Add New</button>
    <div class="clear"></div>
    <hr>
    <table class="nice-table" >
    <thead>
    <tr>
    <th>ID</th>
    <th>Image</th>
    <th>Product Name</th>
    <th>Price</th>
    <th>Description</th>
    <th>Category</th>
    <th>Supplier</th>
    <th>Product Entry</th>
    <th>Edit</th>
    <th>Delete</th>
    </tr>
</thead>
<tbody>
<tr v-for="product in Products">
<td>{{product.id}}</td>
<td><img :src="'http://localhost/blog/public/products/'+ product.image" class="icon"/></td>
<td>{{product.name}}</td>
<td>{{product.price}}</td>
<td>{{product.description}}</td>
<td>{{product["cat_name"]}}</td>
<td>{{product["sup_name"]}}</td>
<td v-if="product.user_name">{{product.user_name}}</td>
<td v-else>unknown</td>
<td><button class="edit" @click="editModal=true; updateProduct=product">Edit</button></td>
<td><button class="delete"  @click="deleteModal=true; deleteProduct=product">Delete</button></td>
</tr>
</tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data () {
    return {
      showingModal:false,
      editModal:false,
      deleteModal:false,
      upImage:false,
      newProduct:{
        name:"",
        supplier:"",
        category:"",
        price:0,
        image:"static/img/thumbnail.svg",
        description:""
},
updateProduct: {},
upPic:{},
deleteProduct: {},
      percent:0,
     Suppliers:[],
     Categories:[],
     Products:[],
     
    }
  },

  mounted(){
     this.allProduct(); 
    this.init();
  },
   methods:{

 
init(){

 //all Supplier----------------------------------------------------
   axios.get('/allSupplier')
  .then(response=>{
   this.Suppliers=response.data;
    
  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'Something went wrong',
     });

    });

//all category-----------------------------------------------------------
    axios.get('/allCategory')
  .then(response=>{
   this.Categories=response.data;
    })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'something wrong',
     });

    });
  
 }, 

 ////add product image viewer -----------------------------------------------------------------
       imgview(event){
         let _this=this;
         let image=event.target.files[0]|| event.dataTransfers.files[0];
         let reader=new FileReader();
         reader.readAsDataURL(image);
          reader.onload=event=>{
            this.newProduct.image=event.target.result;
          }
         
    },

    ////Update product image viewer -----------------------------------------------------------------
       imgupdate(event){
         this.upImage=true;
         let image=event.target.files[0]|| event.dataTransfers.files[0];
         let reader=new FileReader();
         reader.readAsDataURL(image);
          reader.onload=event=>{
            this.upPic=event.target.result;
           
          }
         
    },
///all product------------------------------------------------------------
 allProduct(){
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
  
 },   
///add Product--------------------------------------------------------------------
 addProduct(){
let token=localStorage.getItem("Token");
 axios.post('/Productadd', {
      access_token: token,
    name:this.newProduct.name,
    category:this.newProduct.category,
    supplier:this.newProduct.supplier,
    image:this.newProduct.image,
     price:this.newProduct.price,
    description:this.newProduct.description
  })
  .then(response=>{
    this.showingModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});
     this.newProduct={
       name:"",
        supplier:"",
        category:"",
        price:0,
        image:"static/img/thumbnail.svg",
        description:""
     };
    this. allProduct();
    })
    .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
  });


  },


///edit Product-------------------------------------------------------------------
editProduct(){

  var token=localStorage.getItem("Token");
    axios.post('/updateProduct', {
      access_token: token,
     id:this.updateProduct.id, 
    name:this.updateProduct.name,
    cat_id:this.updateProduct.cat_id,
    sup_id:this.updateProduct.sup_id,
    image:this.upPic,
     price:this.updateProduct.price,
    description:this.updateProduct.description
  })
  .then(response=>{
    this.editModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});

this.updateProduct= {};
this.upPic={};
this.allProduct();

  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});



this.upPic={};
this.allProduct();

  });
        
},
 ////delete Product..........
 dltproduct(){
    var token=localStorage.getItem("Token");
         
    axios.post('/DeleteProduct', {
      access_token: token,
      id:this.deleteProduct.id
  })
  .then(response=>{
    this.deleteModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});
this.allProduct();
})
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});

 this.allProduct();
 
  });

    
     
 },
 
}
}
</script>

