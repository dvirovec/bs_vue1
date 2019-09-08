<template>

<b-modal
      no-fade
      size="xm"
      class="btn-dark"
      ref="form"
      title="Town"
      header-bg-variant="warning"
      body-bg-variant="warning"
      footer-bg-variant="warning">

      <template slot="modal-header">
        <div>Country</div>

        <b-button class="btn btn-primary ml-1 btn-sm float-right" @mouseover="showErrors">
          <font-awesome-icon @mouseover="showErrors" class="sort-down" icon="exclamation-triangle"></font-awesome-icon>
        </b-button>
      </template>

      <template slot="default">
        <b-container v-if="row!=null" style="font-size:12px;">
<b-row>
            <b-col sm=12>
              <label for="input-1" class="mb-0">Name</label>
              <b-form-input
                id="input-1" autofocus
                v-model="row.name"
                type="text"
                required
                placeholder="Town name"
              ></b-form-input>
            </b-col>
</b-row>
<b-row style="margin-top:12px;">
            <b-col sm="6" >
              <label for="input-2" class="mb-0">Country code</label>
              <b-form-input label="Country code" id="input-2" v-model="row.code" type="text" required placeholder="Country code"></b-form-input>
            </b-col>

<b-col sm="6">
 <ComboBox label="Currency" code url="/erp/currency/" v-model="row.currency" />
    </b-col>
</b-row>
        </b-container>     
</template>

<template v-if="errors.length>0" slot="modal-footer" style="justify-content:left!important;">
    <b-table-lite striped hover sticky-header="true" small
    head-variant="dark"
    responsive borderless style="font-size:12px;" :items="errors"></b-table-lite>  
    </template>


<template v-else slot="modal-footer">

  <b-button class="btn btn-primary ml-1 btn-sm float-left" @click="selectRow(1)">
    <font-awesome-icon class="sort-down" icon="caret-down"></font-awesome-icon>
  </b-button>

  <b-button class="btn btn-primary ml-1 btn-sm float-right" @click="selectRow(-1)">
    <font-awesome-icon icon="caret-up"></font-awesome-icon>
  </b-button>

  <b-button variant="secondary" size="sm" class="mr-2" @click="closeCancel">Cancel</b-button>
  <b-button variant="primary" size="sm" @click="updateAppend">Save/Append</b-button>
  <b-button variant="primary" size="sm" @click="updateClose">Save</b-button>

<b-modal no-fade size="lg" ref="error_form" title="Errors" 
header-bg-variant="default"
body-bg-variant="default"
footer-bg-variant="danger">
  <div slot="modal-header">Errors</div>
  <div slot="modal-footer" style="display:none;"/>
</b-modal>

</template>

</b-modal>

    
</template>
<script>

import BaseInputForm from "../views/BaseInputForm.vue"

export default {    
    name:"CountryForm",
    extends:BaseInputForm,
}
</script>

