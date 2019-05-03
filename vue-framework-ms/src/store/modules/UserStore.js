import UserApi from '../../api/UserApi'
import MutationTypes from '../MutationTypes'

let _userApi=new UserApi();

const state={
     users:[],
     mes:""
};
const getters = {
  mes: state => state.mes,
  users: state => state.users
};
const actions={
    getUserInfo({commit}){
        _userApi.get({
          "userId": 1
        }).then(data=>{
          commit(MutationTypes.SET_LISTData, {data})
        })
    }
};

const mutations={
    [MutationTypes.SET_LISTData]( state, {data}) {
      state.users.push(data.result);
      state.mes='aaaaa';
  }
};

export  default
{
  state,
  mutations,
  actions,
  getters
};
