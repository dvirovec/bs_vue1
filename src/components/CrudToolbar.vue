<template>
  <div>
    <b-navbar-nav class="float-left">
      <b-button class="btn btn-dark ml-1 btn-sm" @click="append" v-b-tooltip.hover title="Append">
        <font-awesome-icon style="color:orange;" class="fa-sm" icon="plus"></font-awesome-icon>
        <span style="margin:5px;">Ins</span>
      </b-button>

      <b-button class="btn btn-dark ml-1 btn-sm" @click="remove" v-b-tooltip.hover title="Delete">
        <font-awesome-icon style="color:orange;" class="fa-sm" icon="trash"></font-awesome-icon>
        <span style="margin:5px;">Del</span>
      </b-button>

      <b-button class="btn btn-dark ml-1 btn-sm" @click="edit" v-b-tooltip.hover title="Edit">
        <font-awesome-icon style="color:orange;" class="fa-sm" icon="edit"></font-awesome-icon>
        <span style="margin:5px;">F2</span>
      </b-button>
      <b-button class="btn btn-dark ml-1 btn-sm" @click="refresh" v-b-tooltip.hover title="Refresh">
        <font-awesome-icon style="color:orange;" class="fa-sm" icon="sync-alt"></font-awesome-icon>
        <span style="margin:5px;">F5</span>
      </b-button>
    </b-navbar-nav>
  </div>
</template>
<script>
export default {
  name: "CrudToolbar",
  props: ["append", "remove", "edit", "refresh"]
};
</script>