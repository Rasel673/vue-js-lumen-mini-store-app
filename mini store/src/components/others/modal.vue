<template>
<transition name="scale">
  <div class="modal" v-if="showingModal">
  <div class="modalContainer">

  <div class="modalHeader">
 <p class="fleft"> {{modalHeading}}</p>
 <p class="fright modalClose" @click="$emit('close')">X</p>
 <div class="clear"></div>
  </div>
  <div class="modalContent">
  <slot></slot>
  </div>
  <div class="modalFooter">
  <button class="btnClose fright" @click="$emit('close')">close</button>
 <div class="clear"></div>
  
  </div>

  </div>
  

  </div>
  </transition>
</template>

<script type="text/javascript">
export default {
  name: 'modal',
  computed:{
      showingModal(){
         return this.cond
      },
  
  },
  props:["modalHeading","cond"]
  
}
</script>

