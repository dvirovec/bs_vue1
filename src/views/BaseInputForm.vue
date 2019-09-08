<template>
    
</template>
<script>

import ComboBox from "../components/ComboBox.vue";
import ErrorGrid from "../components/ErrorGrid.vue"
import Vue from 'vue'



export default {
    name:"BaseInputForm",
    components: { ComboBox, ErrorGrid },
    props: ['row', 'move', 'update','cancel', 'append'],
    methods: {
            openForm(){
               this.errors = [];
               this.$refs["form"].show();     
            },
            closeForm(){
               this.$refs["form"].hide();     
            },
            showErrors() {
               this.$refs["error_form"].show();
            },
            closeCancel() {
                this.cancel();                
            },
            updateAppend() {
                if(this.validate())
                    this.update("append");                
            },
            updateClose() {   
                if(this.validate())                             
                    this.update("close");
            },
            selectRow(i) {
               this.move(i); 
            },
            validate() {
                console.log("In form !!");
                return true;
            },            
    },
    data() {
            return {
                ErrorGridClass:Vue.extend(ErrorGrid);
                errors: [],    
            }
        },
    mount: { }    
}
</script>