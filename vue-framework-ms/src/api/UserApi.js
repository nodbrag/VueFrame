import  BaseApi from './BaseApi'

/**
 * 用户api模块
 */
export default class  UserApi extends  BaseApi
{
   constructor(){
     super("Users");
   }
   // 非基类通用在自己类定义共有方法
    async _getUserRole(parms){
      return this._http.POST(this._getApiUrl,parms);
   }

}
