<template>

<div>    
    <label class="mb-0">{{ label }}</label>
    <v-select class="style-chooser"
    search
    :placeholder="label"
    selection
    :options="rows"
    v-model="selected" />
    </div>
</template>

<script>

import axios from 'axios';

    export default {
        name: 'ComboBox',
        props:['label','url','code'],
        data() {
            return { 
                selected: null,
                rows: []
                 }
        },
        created() {            
                      
        },
        mounted() {

        this.rows = [];     

        axios.get(this.url)
        .then(result => {
            if(result.data)  {
                result.data.forEach((e) => {                    
                  this.rows.push(  { code: e.id, label: this.isCode ? e.code : e.name });
                });

                if(this.$attrs.value)
                    this.selected = this.rows.filter(e => e.code == this.$attrs.value.id);                
                }
        })
        .catch(console.error);

       
        },
        computed: {            
            value() { return this.$attrs.value; },
            isCode() { return this.code !=undefined; },
        },
        methods: {
       
        },
        watch: {             
            value: function(val) {              
              this.selected = this.rows.filter(e=>e.code == val.id);
            },
            selected: function(val) {                        
            if(val.code)        
                axios.get(this.url+val.code).then(result => {
                    if(result.status==200) {                                     
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


