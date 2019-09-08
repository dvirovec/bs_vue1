<template>

<div>
  <b-navbar toggleable="lg" type="dark" variant="dark" style="padding:2px;">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

<b-navbar-nav>
          <b-nav-item-dropdown text="Documents" left>
         
          
          <b-dropdown-item href="#">Invoice</b-dropdown-item>
          <b-dropdown-item href="#">Quotation</b-dropdown-item>
          <b-dropdown-item href="#">Travel</b-dropdown-item>
         
        </b-nav-item-dropdown>

      </b-navbar-nav>


      <b-navbar-nav>
          <b-nav-item-dropdown text="Master data" left>
         
         <b-dropdown-item to="/companies">Company</b-dropdown-item>
          <b-dropdown-item to="/towns">Town</b-dropdown-item>
          <b-dropdown-item to="/countries">Country</b-dropdown-item>
          <b-dropdown-item to="/currency">Currency</b-dropdown-item>
          <b-dropdown-item href="#">Organization units</b-dropdown-item>
          <b-dropdown-item href="#">Tax rates</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>

        <b-nav-item-dropdown right>
          <template slot="button-content" v-if="this.$store.state.profile!=null">{{ this.$store.state.profile.name }}</template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Log out</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>

  </b-navbar>

<router-view/>

</div>

</template>


<script>




export default {
    name:'MainPage',
   
    beforeMount() {
    
    this.$store.dispatch("login","dvirovec@gmail.com", "admin");     
    },
}
</script>

<style>

    .modal-header {
      padding:.5rem;
    }
    .modal-footer {
      padding:.5rem;
    }

    .modal-body {
      padding-left:.5rem;
    }

</style>