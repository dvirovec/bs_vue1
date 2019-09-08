<template>

    <b-modal no-fade size="xm" ref="form" title="Town"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      footer-bg-variant="warning">

      <template slot="modal-header">
        <div class="ml-2">Country</div>       
          <font-awesome-icon @mousedown="validate" class="sort-down" icon="exclamation-triangle"></font-awesome-icon>       
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
  
    <template v-if="hasErrors" slot="modal-footer" style="justify-content:left!important;">
      <ErrorGrid ref="errorGrid" />
    </template>

<template v-else slot="modal-footer">
  
  <b-button class="btn btn-primary ml-1 mr-1 btn-sm float-left" @click="selectRow(1)">
    <font-awesome-icon class="sort-down" icon="caret-down"></font-awesome-icon>
  </b-button>

  <b-button class="btn btn-primary mr-1 btn-sm float-right" @click="selectRow(-1)">
    <font-awesome-icon icon="caret-up"></font-awesome-icon>
  </b-button>

  <b-button variant="secondary" size="sm" class="mr-1" @click="closeCancel">Cancel</b-button>
  <b-button variant="primary" size="sm" class="mr-1" @click="updateAppend">Save/Append</b-button>
  <b-button variant="primary" size="sm" class="mr-1" @click="updateClose">Save</b-button>
  
  
</template>

</b-modal>

</template>

<script>

import BaseInputForm from "../views/BaseInputForm.vue"
import { vEmpty, vNumber } from "../components/ValidHelpers"

export default {
    name:"CurrencyForm",
    extends:BaseInputForm,    
    data() {
        return {
            hasErrors: false
        };
    },
    created() {
    
    },
    mounted() {
        
    },
    computed: {
          
    },
    methods: {
        validate() {
          
          if(this.$refs.errorGrid==undefined)
                  this.$refs.errorGrid = new ErrorGridClass();

          this.$refs.errorGrid.clearErrors();

            if(vEmpty(this.row.name)) this.$refs.errorGrid.addError("Currency name can't be empty or number.");          
            
            if(vEmpty(this.row.code)) this.$refs.errorGrid.addError("Currency code can't be empty or number.");          
            
            if(vNumber(this.row.num)) this.$refs.errorGrid.addError("Currency number can't be empty.");          
            
            this.hasErrors = this.$refs.errorGrid.errors.length != 0;

            return !this.hasErrors;

        }
    }
}
</script>
