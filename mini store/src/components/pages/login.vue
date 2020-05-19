<template>

  <div class="login">
  <div id="loading" v-if="img==true">
<img src="/static/img/loader.gif"/>
</div>
    <div class="loginHeader">
    User login
    </div>
    <div class="loginContainer">
    <table>
    <tr>
    <td>User</td>
    <td>:</td>
    <td><input type="text" placeholder="User Name" v-model="user.username" required></td>

    </tr>
    <tr>
    <td>Password</td>
    <td>:</td>
    <td><input type="password" placeholder="Password"  v-model="user.password"  required></td>

    </tr>
    <tr>
    <td></td>
    <td></td>
    <td><button class="addBtn" v-on:click="loginNow()">Login</button></td>

    </tr>
    </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      user:{
        username:"",
        password:""
      },
     img:false,
    }
  },
   methods:{
        loginNow(){
        this.img=true,
        axios.post('/login', {
    user_name:this.user.username,
    password:this.user.password
  })
  .then(response=>{
      this.img=false,
    iziToast.success({
    title: 'Admin',
    message: 'Welcome to ecommerce shop!',
});
    localStorage.setItem("Token",response.data.Token);

    
    this.$router.push({name:"admin"});

  })
  .catch(error=>{
  this.img=false,  
iziToast.warning({
    title: 'Caution',
    message: 'username or password is wrong',
});
  });
        }
      }
}
</script>

