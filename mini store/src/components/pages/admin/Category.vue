<template>
  <div class="Category">
  <!-- Add category modal -->
  <modal modalHeading="Add new category" :cond="showingModal"  @close="showingModal=false">
  <table>
  <tr>
  <td>Category Nmae:</td>
  <td><input type="text" placeholder="Enter name" id="newCatname" v-model="newCat.name"/></td>

  </tr>
  <tr>
  <td>Category Description:</td>
  <td><textarea  placeholder="Enter short description" v-model="newCat.description"></textarea></td>

  </tr>
  <tr>
  <td></td>
  <td><button class="btnSave"  @click="addCate()">save</button></textarea></td>

  </tr>
  </table>
  </modal>
 <!-- Edit category modal -->
   <modal modalHeading="Update  category" :cond="editModal"  @close="editModal=false">
  <table>
  <tr>
  <td>Category Nmae:</td>
  <td><input type="text" placeholder="Enter name"  v-model="updateCat.name"/></td>

  </tr>
  <tr>
  <td>Category Description:</td>
  <td><textarea  placeholder="Enter short description" v-model="updateCat.description"></textarea></td>

  </tr>
  <tr>
  <td></td>
  <td><button class="btnSave"  @click="editCat()">update</button></textarea></td>

  </tr>
  </table>
  </modal>
<!-- delete category  modal-->
<modal modalHeading="Delete category" :cond="deleteModal"  @close="deleteModal=false">
  <table>
  <tr>
  <td></td>
  <td><h3>Are you  want to delete "{{deleteCat.name}}"?</h3></td>
  
  </tr>
  <tr>
  <td></td>
  <td></td>

  </tr>
  <tr>
  
  <td><button class="addBtn" @click="dltcat()">yes</button></td>
  <td><button class="btnClose"  @click="deleteModal=false">no</button></td>
</tr>
  </table>
  </modal>
<!-- All category  table-->
    <h1 class="fleft">Categories</h1>
    <button class="addBtn fright" @click="showingModal=true">Add New</button>
    <div class="clear"></div>
    <hr>
    <table class="nice-table" >
    <thead>
    <tr>
    <th>ID</th>
    <th>Entry By</th>
    <th>Name</th>
    <th>Description</th>
    <th>Edit</th>
    <th>Delete</th>
    </tr>
</thead>
<tbody>
<tr v-for="category in Categories">
<td>{{category.id}}</td>
<td v-if="category.user_name">{{category.user_name}}</td>
<td v-else>unknown</td>
<td>{{category.name}}</td>
<td>{{category.description}}</td>
<td><button class="edit" @click="editModal=true; updateCat=category">Edit</button></td>
<td><button class="delete"  @click="deleteModal=true; deleteCat=category">Delete</button></td>
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
      newCat:{
        access_token:"",
        name:"",
        description:""
      },

       updateCat: {},

deleteCat: {},

     Categories:[]

    

    }
  },

  mounted(){

    this.allcat();
  },
   methods:{

 //all category---------
 allcat(){
   axios.get('/allCategory')
  .then(response=>{
   this.Categories=response.data;
    
  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login and try again',
     });

    });
  
 },    
///add category-----------------
   addCate(){

var token=localStorage.getItem("Token");
  axios.post('/Category', {
      access_token: token,
    name:this.newCat.name,
    description:this.newCat.description
  })
  .then(response=>{
    this.showingModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});
    this. allcat();

})
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
  });
     this.newCat={};
       },
///edit category-------------
editCat(){

  var token=localStorage.getItem("Token");
         
    axios.post('/updateCategory', {
      access_token: token,
      id:this.updateCat.id,
    name:this.updateCat.name,
    description:this.updateCat.description
  })
  .then(response=>{
    this.editModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});

this.allcat();

  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
  });
        this.updateCat= {};
    
   },
 ////delete category...........
 dltcat(){
    var token=localStorage.getItem("Token");
         
    axios.post('/DeleteCategory', {
      access_token: token,
      id:this.deleteCat.id
  })
  .then(response=>{
    this.deleteModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});

this. allcat();
})
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
 
  });

  this.deleteCat= {};
     
     
 },
 
}
}
</script>

