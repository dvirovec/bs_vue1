<template>

<div style="width:100%;margin-top:3px;" v-if="errors.length>0">
    <b-table sticky-header striped hover small
    head-variant="dark"
    responsive borderless style="font-size:.8em;height:80px;" :items="errors" :fields="fields"></b-table>  
  </div>    

</template>

<script>

export default {
    name:"ErrorGrid",
    data() {
        return {
            fields:['errors'],
            errors: [],
        }
    },
    created() {
        console.log("Created");
    },
    methods: {
        clearErrors() {
                this.errors = [];
            },
        addError(error, ref) {
                this.errors.push({errors: error, ref});
            }
    }

}
</script>

<style scoped>

</style>