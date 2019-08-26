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
    
<CompanyForm :row="row" :update="update" :append="appendRow" 
          :cancel="closeCancel" :move="selectRow" ref="form"/>

</div>

</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";
import CrudToolbar from "../components/CrudToolbar.vue";
import CompanyForm from "../views/CompanyForm.vue"

export default {
  name: "CompanyList",
  components: {CrudToolbar, AgGridVue, CompanyForm },
  data() {
    return {      
      key: "company",            
      selectedNodes: null,
      columnDefs: null,
      gridOptions: null,
      defaultColDef: null,
      rowData: null,
      gridApi: null,            
      lastKey:null,
    };
  },
  computed: {    
    rows() { return this.$store.state.data[this.key].rows; },
    row() { return this.$store.state.data[this.key].row },
    modal_open() {
      if(this.$refs["form"])
        return this.$refs["form"].isShow;
    }
  },
  created() { },
  methods: {

    onCellKeyDown(e) {
       
      this.lastKey = e.event.key;

      switch (e.event.key) {        
        case "F2":
          this.showModal();
          break;
        case "F5":
          this.loadData();
          break;
        case "Esc":
          break;
        case "Delete":
          {
            if (!this.modal_open) this.deleteRow();
          }
          break;
        case "Help":
          this.appendRow();
          break;
      }
    },
    deleteRow() {
    
    this.$bvModal
        .msgBoxConfirm(this.gridApi.getSelectedNodes().length > 1 ? "Delete selected records !?" : "Delete " + this.row.name + " !?", {
          title: "Please Confirm",
          noFade: true,
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "Yes",
          cancelTitle: "No",
          footerClass: "p-2",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {

            let rows = this.gridApi.getSelectedNodes();

            if(this.selectedNodes.rowNodes.length>0)
                  this.selectedNodes.rowNodes.forEach((e)=>{
                    rows.push(e);
                  });

            rows.forEach((e)=>{
              this.$store.dispatch("deleteRow", {key:this.key, row: e.data });
            });
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    closeModal() {
      this.$refs["form"].closeForm();
    },
    showModal() {
      if(this.$refs["form"])
          this.$refs["form"].openForm();
    },
    closeCancel() {
      this.closeModal();
    },
    loadData() {
       this.$store.dispatch("loadData", this.key);
    },
    appendRow() {   
      this.redraw()
      this.$store.dispatch("newRow",this.key, this.showModal());
    },
    onSelectionChanged(e) {
      if (this.gridApi.getSelectedNodes()) {        
        if (this.gridApi.getSelectedNodes().length > 0) {                  
          this.$store.dispatch("selectRow", { key:this.key, row:this.gridApi.getSelectedNodes()[0].data });          
        }        
      }
    },
     onCellFocused(e) {
      if(this.lastKey == 'Help') return; 
      if (this.gridApi && this.gridApi.getDisplayedRowAtIndex(e.rowIndex)) {       
          this.$store.dispatch("selectRow", { key:this.key, row:this.gridApi.getDisplayedRowAtIndex(e.rowIndex).data });                  
          this.selectedNodes = { rowNodes: [this.gridApi.getDisplayedRowAtIndex(e.rowIndex)] };
      }
    },
    updateAppend(){
      this.$store.dispatch("updateData", this.key, {row:this.row}, this.appendRow );
      this.appendRow();
    },
    updateClose() {
      this.$store.dispatch("updateData", this.key, {row:this.row}, this.redraw() );      
      this.closeModal();
   },    
   update(mode) {
      switch(mode) {
        case 'append': this.updateAppend();break;
        case 'close': this.updateClose();break;
      }
   },
    redraw() {
        this.gridApi.redrawRows(this.selectedNodes);
    },
    deselectAll() {
      this.gridApi.getSelectedNodes().forEach(node => {
            node.setSelected(false);
        });
    },
    selectRow(n) {            
      const cell = this.gridApi.getFocusedCell();
      if (cell) {
        const x = cell.rowIndex + n;
        if (x >= 0 && x < this.gridApi.getDisplayedRowCount())
          this.gridApi.setFocusedCell(x, cell.key, null);
      }
    },
    gridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
    }
  },
  mounted() {},
  refresh() {},

  beforeMount() {

    document.title = "Company";
    
    this.gridOptions = {
      getRowNodeId: function(data) {
        return data.id;
      },
      onCellKeyDown: this.onCellKeyDown,
    };

    this.defaultColDef = {
      cellStyle: {
        "text-align": "left",
        "font-size": "14px",
        "font-weight": 400
      },
      resizable: true,
      suppressSizeToFit: true,
      sortable: "true",
      filter: "true"
      //headerCheckboxSelection: true,
      //headerCheckboxSelectionFilteredOnly: true,
    };

    this.columnDefs = [
      { headerName: "Id", field: "id" },
      {
        checkboxSelection: true,
        headerCheckboxSelection: true,
        headerName: "Company name",
        pinned: "left",
        //editable: true,
        field: "name",
        width: 450
      },      
      { headerName: "VAT number", field: "cid" },
      { headerName: "Address", field: "address" },
      { headerName: "Town", field: "town.name" },
      {
        headerName: "Country",
        field: "country.name",
        width: 200,
        resizable: true,
        suppressSizeToFit: false
      }
    ];

    this.loadData();
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