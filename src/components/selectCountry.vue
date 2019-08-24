<template>

<div>    
    <label class="mb-0">{{ label }}</label>
    <v-select class="style-chooser"    
    search
    placeholder="Država"
    selection
    :options="rows"
    v-model="selected" />
    </div>
</template>

<script>

import axios from 'axios';

    export default {
        name: 'SelectCountry',
        props:['label','code'],
        data() {
            return { 
                selected:null,
                rows: [],                               
                 }
        },
        created() {            
                      
        },
        mounted() {            

      this.rows = [];
      
        axios.get('/erp/country')
        .then(result => {
            if(result.data) 
                result.data.forEach((e) => {                                        
                  this.rows.push(  { code: e.id, label: this.isCode ? e.code : e.name });
      });
        })
        .catch(console.error);
            if(this.$attrs.value)
                this.selectedTown = this.$attrs.value.name;
        },
        computed: {            
            id() { return this.$attrs.value ? this.$attrs.value.id : null; },
            isCode() {                                 
                return this.code !=undefined;             
            },            

        },
        methods: {
                
        },
        watch: {
            id: function(val) {
                this.selectedTownId = val;    
            }, 
            selected: function(val) {                       
            if(val.code)        
            axios.get('/erp/country/'+val.code).then(result => {
                if(result.status=200) {                                     
                     this.$emit('input',result.data);                    
                }
                }).catch(console.error);                             
            },
        }  
    };
</script>
<style>


  .style-chooser .vs__search::placeholder,
  .style-chooser .vs__dropdown-toggle,
  .style-chooser .vs__dropdown-menu {
    background:white;
    border: none;
    color:black;
  /*  text-transform: lowercase;
    font-variant: small-caps;*/
      font-family: "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  font-size: 13px;
  padding:4px;
  }

  .style-chooser .vs__clear,
  .style-chooser .vs__open-indicator {
    fill: #394066;
  }

</style>


