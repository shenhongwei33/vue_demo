import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions/actions.js';
import getters from './getters.js';
import mutations from './mutations.js'

//import com from './modules/common.js';

Vue.use(Vuex);
export default new Vuex.Store({
	actions,
	getters,
	mutations,
	modules : {
		//com,
	}
});
