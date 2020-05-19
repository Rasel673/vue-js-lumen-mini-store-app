import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
   appName:"My Cart",
   cart:[],
  },
  getters: {
    getAppName: state => {
      return state.appName
    },
    getCart: state=>{
      return state.cart
    },
   getTotal:state=>{
    var total=0;
      for(var i=0; i<state.cart.length;i++){
        var item=state.cart[i];
        total +=item.product.price*item.qty
    }
    return total;
   } 

  },
  
  mutations: {
    addToCart(state, payload) {
      state.cart.push(payload);
      
    },
   removeCart(state, payload){
    state.cart.splice(payload,1);
   }
    
  },
  actions: {
   
  },
  plugins: [createPersistedState()]
})

export default store;