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
    
<CountryForm :row="row" :update="update" :append="appendRow" 
          :cancel="closeCancel" :move="selectRow" ref="form"/>

</div>

</template>

<script>
import DataListBase from "../views/DataListBase.vue";
import CountryForm from "../views/CountryForm.vue"

export default {
  name: "CountryList",
  extends: DataListBase,
  components: { CountryForm },
  data() {
    return {      
      key: "country",
    };
  },
  beforeMount() {

    document.title = "Country";

    this.columnDefs = [      
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerName: "Country name",
        pinned: "left",
        //editable: true,
        field: "name",
        width: 250,
        suppressSizeToFit: false
      },      
      { headerName: "Country code", width: 220, field: "code" },
      { headerName: "Currency", width: 220, field: "currency.code" },    
    ];    
  }
};
</script>