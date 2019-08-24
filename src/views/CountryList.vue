<template>

  <div style="height: 100%; width: 100%;">
      
<b-navbar class="btn-secondary btn-group"  style="padding:2px;padding-left:1px;width:100%;">
     
     <CrudToolbar :append="appendRow" :remove="deleteRow" :refresh="loadData" :edit="showModal" />  

      <b-navbar-nav class="btn-group float-right">
        <span v-if="row != null" style="padding-left:5px;">{{ row.name }}</span>
      </b-navbar-nav>

    </b-navbar>

    <ag-grid-vue
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

<b-modal no-fade size="lg" ref="error_form" title="Errors"
header-bg-variant="default"
body-bg-variant="default"
footer-bg-variant="danger">
  <div slot="modal-header">Errors</div>
  <div slot="modal-footer" style="display:none;"/>
</b-modal>

</div>

</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import axios from "axios";
import ComboBox from "../components/ComboBox.vue";
import CrudToolbar from "../components/CrudToolbar.vue";

export default {
  name: "CountryList",
  components: { ComboBox, AgGridVue, CrudToolbar},
  data() {
    return {
      api_url: "/erp/country/",
      rows: [],
      row: null,
      id: null,
      columnDefs: null,
      gridOptions: null,
      defaultColDef: null,
      rowData: null,
      gridApi: null,
      open: false,
      errors: false,
      lastKey: null
    };
  },
  computed: {
    modal_open() {
      if(this.$refs["form"])
        return this.$refs["form"].isShow;
    }
  },
  created() {},
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
      this.boxTwo = "";
      this.$bvModal
        .msgBoxConfirm("Delete " + this.row.name + " !?", {
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

            if (this.row.id == null) {
              this.removeSelectedRowsInGrid();        
              return;
            }

            if (this.row.id) {
              axios
                .delete(this.api_url + this.row.id)
                .then(result => {         
                    this.removeSelectedRowsInGrid();
                })
                .catch(console.error);
            }
          }
        })
        .catch(err => {
          // An error occurred
        });
    },
    showErrors() {
      this.$refs["error_form"].show();
    },
    closeModal() {
      this.$refs["form"].hide();
    },
    showModal() {
      if(this.$refs["form"] && !this.modal_open)
          this.$refs["form"].show();
    },
    closeCancel() {
      this.closeModal();
      this.removeNullRow();
    },
    removeNullRow() {
      if (this.row && this.row.id == null) {
          var node = this.gridApi.getRowNode(null);
          node.setSelected(true);
          this.removeSelectedRowsInGrid();
          }
    },
    loadData() {
      axios
        .get(this.api_url)
        .then(result => {
          this.rows = result.data;
        })
        .catch(console.error);
    },
    appendRow() {
      axios
        .get(this.api_url + "-1")
        .then(result => {          
          this.rows.push(result.data);
          this.row = result.data;
          this.deselectAll();
          var newItems = [result.data];
          var res = this.gridApi.updateRowData({ add: newItems });

          res["add"][0].setSelected(true);

          this.showModal();
        })
        .catch(console.error);
    },
    updateAppend(){
      this.update();
      this.appendRow();
    },
    updateClose() {
      this.update();
      this.closeModal();
    },
    update() {
      if (this.row.id != null) {
        axios
          .put(this.api_url + this.row.id, this.row)
          .then(result => {
            var node = this.gridApi.getRowNode(result.data.id);
            node.setData(result.data);
            node.setSelected(true);
          })
          .catch(console.error);
      } else {        
        axios
          .post(this.api_url, this.row)
          .then(result => {
            var node = this.gridApi.getRowNode(null);
            node.setSelected(true);
            this.row.id = result.data.id;
            node.setData(result.data);
          })
          .catch(console.error);
      }
    },
    deselectAll() {
      var nodes = this.gridApi.getSelectedNodes();
      nodes.forEach(node => {
            node.setSelected(false);
        });
    },
    removeSelectedRowsInGrid() {
      var rows = this.gridApi.getSelectedRows();
      var result = this.gridApi.updateRowData({ remove: rows });

      var null_row = this.rows.filter(e=>e.id==null);

        null_row.forEach(row => {
            this.rows.pop(row);
        });

    },

    selectRow(n) {
      //  console.log(this.$refs["form"].isShow);

      if (!this.modal_open) return;

      const cell = this.gridApi.getFocusedCell();

      if (cell) {
        const x = cell.rowIndex + n;
        if (x >= 0 && x < this.gridApi.getDisplayedRowCount())
          this.gridApi.setFocusedCell(x, cell.key, null);
      }
    },
    onSelectionChanged(e) {
      if (this.gridApi.getSelectedNodes()) {        
        if (this.gridApi.getSelectedNodes().length > 0) {
          this.id = this.gridApi.getSelectedNodes()[0].id;
          this.row = this.gridApi.getSelectedNodes()[0].data;
        }
        //this.$store.dispatch("selectCompany", this.gridApi.getSelectedNodes()[0]);
        //this.$store.state.id = this.gridApi.getSelectedNodes()[0].id;
        //this.$store.commit("selectCompany",this.gridApi.getSelectedNodes()[0].data);
      }
    },
    onCellFocused(e) {

      if(this.lastKey == 'Help') return;
      
      if (this.gridApi && this.gridApi.getDisplayedRowAtIndex(e.rowIndex)) {        
        this.row = this.gridApi.getDisplayedRowAtIndex(e.rowIndex).data;
      }
      
    },

    gridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      /*  if (this.$store.state.id) {
        let snode = this.gridApi.getRowNode(this.$store.state.id);
        if (snode) snode.setSelected(true);
      }*/

      this.gridApi.sizeColumnsToFit();
    }
  },
  mounted() {
    this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
      this.removeNullRow();      
    })
  },
  refresh() {},

  beforeMount() {
    
    document.title = "Country";

    this.loadData();

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