<template>

    <b-modal no-fade size="xm" ref="form" title="Town"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      footer-bg-variant="warning">

      <template slot="modal-header">
        <div class="ml-2">Country</div>     
        <div>  
          <font-awesome-icon v-show="hasErrors" @mousedown="validate"  class="sort-down mr-2" icon="exclamation-triangle"></font-awesome-icon>   
          <font-awesome-icon  @mousedown="closeCancel" class="sort-down" icon="window-close"></font-awesome-icon>     
      </div>
      </template>

      <template slot="default">
        <b-container v-if="row!=null" style="font-size:12px;">
         
          <b-row class="input-row">
            <b-col sm=6 >
              <label for="input-1" class="mb-0">Currency name</label>
              <b-form-input
                id="input-1" autofocus
                v-model="row.name"
                type="text"
                required
                placeholder="Currency name"
              ></b-form-input>
            </b-col>

            <b-col sm="3">
              <label for="input-2" class="mb-0">Currency code</label>
              <b-form-input id="input-2" v-model="row.code" type="text" required placeholder="Currency code"></b-form-input>
            </b-col>

            <b-col sm="3">
              <label for="input-3" class="mb-0">Numeric code</label>
              <b-form-input id="input-2" v-model="row.num" type="text" required ></b-form-input>
            </b-col>

</b-row>
        </b-container>     

</template>
  
<template slot="modal-footer">

<b-container>

<b-row v-show="!hasErrors">

  <b-button class="btn btn-primary ml-1 mr-1 btn-sm" @click="selectRow(1)">
    <font-awesome-icon class="sort-down" icon="caret-down"></font-awesome-icon>
  </b-button>

  <b-button class="btn btn-primary mr-1 btn-sm" @click="selectRow(-1)">
    <font-awesome-icon icon="caret-up"></font-awesome-icon>
  </b-button>

  <b-button variant="secondary" size="sm" class="mr-1" @click="closeCancel">Cancel</b-button>
  <b-button variant="primary" size="sm" class="mr-1" @click="updateAppend">Save/Append</b-button>
  <b-button variant="primary" size="sm" class="mr-1" @click="updateClose">Save</b-button>

</b-row>

<b-row v-show="hasErrors">  
  <ErrorGrid  ref="errorGrid" />
</b-row>

</b-container>

</template>

</b-modal>

</template>

<script>

import BaseInputForm from "../views/BaseInputForm.vue"
import { vEmpty, vNumber, vIsLength } from "../components/ValidHelpers"

export default {
    name:"CurrencyForm",
    extends:BaseInputForm,
    created() {
    
    },
    mounted() {
        
    },
    computed: {
          
    },
    methods: {
      
        validate() {

          if(!this.$refs.errorGrid) return true;

            this.$refs.errorGrid.clearErrors();

            if(vEmpty(this.row.name)) this.$refs.errorGrid.addError("Currency name can't be empty or number.");          
            
            if(vEmpty(this.row.code)) this.$refs.errorGrid.addError("Currency code can't be empty or number.");          
            
            if(!vIsLength(this.row.code,3)) this.$refs.errorGrid.addError("Currency code must be 3 characters long.");          
             
            if(vNumber(this.row.num)) this.$refs.errorGrid.addError("Currency number can't be empty.");          

            if(!vIsLength(String(this.row.num),3)) this.$refs.errorGrid.addError("Currency number must be 3 digits long.");          
           
            this.hasErrors = (this.$refs.errorGrid.errors.length > 0) 

            return !this.hasErrors;


        }
    }
}
</script>
