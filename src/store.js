import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

state: {
    profile: null,
    data: {
        company: {url:'/erp/company/', rows:[], row: null },
        town: {url:'/erp/town/', rows:[], row: null },
        country: {url:'/erp/country/', rows:[], row: null },
        currency: {url:'/erp/currency/', rows:[], row: null }
    }
},
mutations: {
   setRows(state, params) {
      state.data[params.key].rows = params.rows;            
   },
   delRow(state, params) {
    let rowIndex =  state.data[params.key].rows.findIndex((e)=>e.id === params.id);
    if(rowIndex!=-1) state.data[params.key].rows.splice(rowIndex,1);
   }, 
   updateRow(state, params) {     
    let i =  state.data[params.key].rows.findIndex((e)=>e.id === params.row.id);
    console.log(i);
    if(i!=-1) {
        state.data[params.key].rows[i] = params.row;
      }
    else {
        state.data[params.key].rows.push(params.row);
      }    
   },
   setSelectedRow(state, params) {
      state.data[params.key].row = params.row;
   },
    setUserData(state, userData)  {
        state.profile = userData;
        axios.get('erp/user_detail/'+userData.id)
        .then( result=>{this.state.profile.userDetail = result.data;})
        .catch(console.error);
    }
},
actions: {
  login({commit}, username, password ) {
    axios.get('/erp/login/'+username+'/'+password)
        .then(           
          result=>{commit('setUserData', result.data) })
        .catch(console.error);
  },
    loadData({commit}, key) {
       let url = this.state.data[key].url;
        axios.get(url)
        .then(result=>{ commit('setRows',{ key: key, rows: result.data }) })
        .catch(console.error);
    },
    newRow({commit}, key, method) {
      let url = this.state.data[key].url+"-1";
      axios
        .get(url)
        .then(result => {           
          commit('setSelectedRow', {key:key, row:result.data});
          if(method) method();
        })
        .catch(console.error);
    },
    updateData({commit}, key, method) {
      let url = this.state.data[key].url;      
      if (this.state.data[key].row.id != null) {
        url+=this.state.data[key].row.id;
        axios
          .put(url, this.state.data[key].row)
          .then(result => {          
              commit("updateRow", { key:key, row:result.data });
              if(method) method();
          })
          .catch(console.error);
      } else {                
        axios
          .post(url, this.state.data[key].row)
          .then(result => {
            commit("updateRow", { key:key, row:result.data });
            if(method) method();
          })
          .catch(console.error);
      }
    },
    selectRow({commit}, data) {
      commit("setSelectedRow", data);
    },
    deleteRow({commit}, params) {
      let url = this.state.data[params.key].url+params.row.id;  
      if (params.row.id) {
        axios
          .delete(url)
          .then(result => {         
              commit("delRow", {key:params.key, id:params.row.id });
          })
          .catch(console.error);
      }
    }

},
});