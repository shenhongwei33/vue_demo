import {SET_USERNAME,SET_ROLECODE,SET_PERMISSIONS} from './mutation-types'


export default{
    [SET_USERNAME] (state,{userName}){
        state.userName=userName;
    },
    [SET_ROLECODE](state, {
      roleCode
    }) {
      state.roleCode = roleCode;
    },
    [SET_PERMISSIONS](state, {
      permissions
    }) {
      state.permissions = permissions;
    }
}