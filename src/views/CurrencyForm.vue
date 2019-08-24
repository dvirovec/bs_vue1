<template>

    <b-modal no-fade size="xm" class="btn-dark" ref="form" title="Town"
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
            <b-col sm=6>
              <label for="input-1" class="mb-0">Currency name</label>
              <b-form-input
                id="input-1" autofocus
                v-model="row.name"
                type="text"
                required
                placeholder="Town name"
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

<b-modal no-fade size="lg" ref="error_form" title="Errors"
    header-bg-variant="default"
    body-bg-variant="default"
    footer-bg-variant="danger">
  <div slot="modal-header">Errors</div>
  <div slot="modal-footer" style="display:none;"/>
</b-modal>


</template>

<template slot="modal-footer">

  <b-button class="btn btn-primary ml-1 btn-sm float-left" @click="selectRow(1)">
    <font-awesome-icon class="sort-down" icon="caret-down"></font-awesome-icon>
  </b-button>

  <b-button class="btn btn-primary ml-1 btn-sm float-right" @click="selectRow(-1)">
    <font-awesome-icon icon="caret-up"></font-awesome-icon>
  </b-button>

  <b-button variant="secondary" size="sm" class="mr-2" @click="closeCancel">Cancel</b-button>
  <b-button variant="primary" size="sm" @click="updateAppend">Save/Append</b-button>
  <b-button variant="primary" size="sm" @click="updateClose">Save</b-button>

</template>

</b-modal>


</template>

<script>
export default {
    name:"CurrencyForm",
    props: ['row', 'move', 'update','cancel', 'append'],
    methods: {
            openForm(){
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
                this.update("append");                
            },
            updateClose() {                                
                this.update("close");
            },
            selectRow(i) {
               this.move(i); 
            }

    },
    data() {
            return {

            }
        },
    mount: {
        
    }    
}
</script>