import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({

state: {
    company:null,
    companies: [],
    profile: null,
    company_url: '/erp/company/'
},
mutations: {
    updateCompanies(state, companies) {
      state.companies = [];
      companies.forEach((element) => {
        this.state.companies.push(element);        
        //state.comp_selection.push({ value: element.id, text: element.name });
      });
      if(state.companies.length>0)
        this.state.comapny = state.companies[0];      
    },
    updateSelectedCompany(state, company) {
      if(company)
        state.company = state.companies.filter(e => e.id === company.id);      
    },
//-----------------------db
append(state) {
  axios.get(state.company_url+'-1')
  .then((result) => {
    state.companies.push(result);
    state.company = result;})
    .catch(console.error);
},
update(state) {
  if (this.state.company.id) {
    axios.put(this.state.company_url+state.company.id, state.company)
      .then(console.log('Saved update...')).catch(console.error);
  } else {
    axios.post(this.company_url, state.company)
      .then((result) => {
        state.company.id = result.data.id;
      }).catch(console.error);
  }
},
delete(state) {
  if (state.company.id) {
    axios.delete(this.state.company_url+state.company.id)
      .then((result) => {
        const i = state.companies.findIndex(e => e.id === result.data.id);
        state.companies.splice(i, 1);

        if ((state.companies.length - 1) >= i) state.i = i;
        else state.i = state.companies.length - 1;
      })
      .catch(console.error);
  }
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
        .then(result=>commit('setUserData', result.data))
        .catch(console.error);
  },
    getCompanies({commit}) {
        axios.get(this.state.company_url)
        .then(result=>{commit('updateCompanies', result.data)})
        .catch(console.error);
    },
    selectCompany({commit}, company) {
      commit('updateSelectedCompany', company)
    }


},

});