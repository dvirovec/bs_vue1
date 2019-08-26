<template>

  <div style="height: 100%; width: 100%;">
        
<b-navbar class="btn-secondary btn-group" style="padding:2px;padding-left:1px;width:100%;">
      
<CrudToolbar :append="appendRow" :remove="deleteRow" :refresh="loadData" :edit="showModal"/>  

      <b-navbar-nav class="btn-group float-right">
        <span v-if="row != null" style="padding-left:10px;">{{ row.name }}</span>
      </b-navbar-nav>

</b-navbar>

    <ag-grid-vue ref="dataGrid"
      style="width: 100%; height: 1000px;"
      class="ag-theme-balham-dark"
      singleClickEdit="true"
      :defaultColDef="defaultColDef"
      :columnDefs="columnDefs"
      :gridOptions="gridOptions"
      :rowData="rows"
      rowSelection="multiple"
      rowDeselection="true"
      @grid-ready="gridReady"
      @selection-changed="onSelectionChanged"
      @cell-focused="onCellFocused"
    ></ag-grid-vue>
<!-- data form -->
    
<CurrencyForm :row="row" :update="update" :append="appendRow" 
          :cancel="closeCancel" :move="selectRow" ref="form"/>

</div>

</template>

<script>

import DataListBase from "../views/DataListBase.vue";
import CurrencyForm from "../views/CurrencyForm.vue"

export default {
  name: "CurrencyList",
  extends: DataListBase,
  components: { CurrencyForm },
  data() {
    return {      
      key: "currency",                  
    };
  },
  beforeMount() {

    document.title = "Currency";
    
    this.columnDefs = [      
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerName: "Currency name",
        pinned: "left",
        //editable: true,
        field: "name",
        width: 450,
        suppressSizeToFit: false
      },      
      { headerName: "Code", field: "code" },
      { headerName: "Numeric code", field: "num" },
    
    ];

  }
};
</script>

<style lang="scss">
@import "../../node_modules/ag-grid-community/dist/styles/ag-grid.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-blue.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-dark.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-bootstrap.css";
@import "../../node_modules/ag-grid-community/dist/styles/ag-theme-balham-dark.css";

.error-modal {
  background-color: lightcoral;
}

/*.modal-content {
  background-color: orange;
}*/

.form-control {
  font-family: "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell,
    "Helvetica Neue", sans-serif;
  font-size: 13px;
}

.ag-theme-balham-dark .ag-row-selected {
  background-color: orange;
  color: black;
}

.ag-theme-balham-dark .ag-ltr .ag-cell-focus {
  border: 1px solid red;
}
.ag-theme-balham-dark
  .ag-ltr
  .ag-has-focus
  .ag-cell-focus:not(.ag-cell-range-selected) {
  border: 1px solid white;
}
.ag-theme-balham-dark .ag-icon-checkbox-checked {
  color: white;
}

.ag-theme-balham-dark .ag-ltr .ag-cell-focus {
  border: 1px solid gray;
}
</style>