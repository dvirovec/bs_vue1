import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-select/dist/vue-select.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCoffee, faPlus, faTrash, faEdit, faSyncAlt, faSortUp, faSortDown, faCaretDown, faCaretUp, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'

import store from './store';
import router from './router';

import App from './App.vue'

library.add(faPlus, faTrash, faEdit, faSyncAlt, faCaretDown, faCaretUp, faExclamationTriangle)

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)

new Vue({store,router,
  render: h => h(App),
}).$mount('#app')
