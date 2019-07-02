import {BaseActions, BaseGetters, BaseMutations, BaseState} from "./BaseStore";

/**
 * 公共字典状态类
 */
class CommonDictionaryState extends  BaseState {
  constructor()
  {
    super({});
  }
}
/**
 * action 基类
 */
export class CommonDictionaryActions extends  BaseActions{
}
/**
 * getters 基类
 */
class CommonDictionaryGetters extends  BaseGetters {

}
/**
 * mutaions
 */
class CommonDictionaryMutations extends BaseMutations {
}
export  default
{
  namespaced: true,
  state:new CommonDictionaryState(),
  getters:new CommonDictionaryGetters(),
  mutations:new CommonDictionaryMutations(),
  actions:new CommonDictionaryActions()
};
