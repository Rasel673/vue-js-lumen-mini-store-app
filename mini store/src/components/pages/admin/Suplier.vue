    
<template>
  <div class="Category">
  <!-- Add category modal -->
  <modal modalHeading="Add new supplier" :cond="showingModal"  @close="showingModal=false">
  <table>
  <tr>
  <td>Supplier Name:</td>
  <td><input type="text" placeholder="Enter name" id="newCatname" v-model="newSup.name"/></td>

  </tr>
  <tr>
  <td>Supplier address:</td>
  <td><textarea  placeholder="Enter suplier address..." v-model="newSup.address"></textarea></td>
</tr>
<tr>
  <td>Phone:</td>
  <td><input type="text" v-model="newSup.phone"/></td>
</tr>
<tr>
  <td>Suplier description:</td>
  <td><textarea  placeholder="Write short description....." v-model="newSup.description"></textarea></td>
</tr>

  <tr>
  <td></td>
  <td><button class="btnSave"  @click="addSup()">save</button></textarea></td>

  </tr>
  </table>
  </modal>
 <!-- Edit category modal -->
   <modal modalHeading="Update  supplier" :cond="editModal"  @close="editModal=false">
  <table>
  <tr>
  <td>Supplier Name:</td>
  <td><input type="text" placeholder="Enter name" id="newCatname" v-model="updateSup.name"/></td>

  </tr>
  <tr>
  <td>Supplier address:</td>
  <td><textarea  placeholder="Enter suplier address..." v-model="updateSup.address"></textarea></td>
</tr>
<tr>
  <td>Phone:</td>
  <td><input type="text" v-model="updateSup.phone"/></td>
</tr>
<tr>
  <td>Suplier description:</td>
  <td><textarea  placeholder="Write short description....." v-model="updateSup.description"></textarea></td>
</tr>
  <tr>
  <td></td>
  <td><button class="btnSave"  @click="editSup()">update</button></textarea></td>
</tr>
  </table>
  </modal>
<!-- delete category  modal-->
<modal modalHeading="Are you Sure" :cond="deleteModal"  @close="deleteModal=false">
  <table>
  <tr>
  <td></td>
  <td><h3>You are going to delete "{{deleteSup.name}}"?</h3></td>
  
  </tr>
  <tr>
  <td></td>
  <td></td>

  </tr>
  <tr>
  
  <td><button class="addBtn" @click="dltSup()">yes</button></td>
  <td><button class="btnClose"  @click="deleteModal=false">no</button></td>
</tr>
  </table>
  </modal>
<!-- All category  table-->
    <h1 class="fleft">Suppliers</h1>
    <button class="addBtn fright" @click="showingModal=true">Add New</button>
    <div class="clear"></div>
    <hr>
    <table class="nice-table" >
    <thead>
    <tr>
    <th>ID</th>
    <th>Entry By</th>
    <th>Supplier Name</th>
    <th>Description</th>
    <th>Phone</th>
    <th>Address</th>
    <th>Edit</th>
    <th>Delete</th>
    </tr>
</thead>
<tbody>
<tr v-for="supplier in Suppliers">
<td>{{supplier.id}}</td>
<td v-if="supplier.user_name">{{supplier.user_name}}</td>
<td v-else>unknown</td>
<td>{{supplier.name}}</td>
<td>{{supplier.description}}</td>
<td>{{supplier.phone}}</td>
<td>{{supplier.address}}</td>

<td><button class="edit" @click="editModal=true; updateSup=supplier">Edit</button></td>
<td><button class="delete"  @click="deleteModal=true; deleteSup=supplier">Delete</button></td>
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
      newSup:{},
updateSup: {},

deleteSup: {},

     Suppliers:[],
     
    

    }
  },

  mounted(){

    this.allSup();
  },
   methods:{

 //all Supplier---------
 allSup(){
   axios.get('/allSupplier')
  .then(response=>{
   this.Suppliers=response.data;
    
  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login and try again',
     });

    });
  
 },    
///add suppliers-----------------
 addSup(){
var token=localStorage.getItem("Token");
    axios.post('/Supplier', {
      access_token: token,
    name:this.newSup.name,
    address:this.newSup.address,
    Phone:this.newSup.phone,
    description:this.newSup.description
  })
  .then(response=>{
    this.showingModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});
    this. allSup();
    
})
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
  });
 
     this.newSup={};
       },
///edit Supplier-------------
editSup(){

  var token=localStorage.getItem("Token");
    axios.post('/updateSupplier', {
      access_token: token,
       id:this.updateSup.id,
    name:this.updateSup.name,
    address:this.updateSup.address,
    Phone:this.updateSup.phone,
    description:this.updateSup.description
  })
  .then(response=>{
    this.editModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});

this.allSup();

  })
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
  });
        this.updateSup= {};
    
   },
 ////delete Supplier..........
 dltSup(){
    var token=localStorage.getItem("Token");
         
    axios.post('/DeleteSupplier', {
      access_token: token,
      id:this.deleteSup.id
  })
  .then(response=>{
    this.deleteModal=false;
    iziToast.success({
    title: 'Admin',
    message: response.data.status,
   
});

 this.allSup();
})
  .catch(error=>{
iziToast.error({
    title: 'Caution',
    message: 'please login or try again',
});
 
  });

  this.deleteSup= {};
     
     
 },
 
}
}
</script>

