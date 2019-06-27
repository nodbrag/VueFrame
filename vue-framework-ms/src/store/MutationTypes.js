/**
 * Mutation类型定义
 */
export  default  class MutationTypes {

  /**
   * 设置当前登录用户
   * @type {string}
   */
  static  SET_NICKNAME='SET_NICKNAME';
  /**
   * 设置列表数据
   * @type {string}
   */
 static  SET_LISTData='SET_LISTData';
  /**
   * 设置选中记录数据
   * @type {string}
   */
 static  SET_SELECTUSERS='SET_SELECTUSERS';
  /**
   * 编辑FROM
   * @type {string}
   */
 static SET_EDITFORM='SET_EDITFORM';

 // TOP 组件模块
  /**
   * 设置全屏标识状态
   * @type {string}
   */
  static  SET_FULLSCREEN='SET_FULLSCREEN';
  /**
   * 设置菜单收缩标识状态
   * @type {string}
   */
  static  SET_COLLAPSED='SET_COLLAPSED';

  /**
   * 设置菜单选中标识状态
   * @type {string}
   */
  static  SET_DEFAULTACTIVEINDEX='SET_DEFAULTACTIVEINDEX';

  //公共模块
  /**
   * 设置记录总数
   * @type {string}
   */
  static  SET_TOTALCOUNT='SET_TOTALCOUNT';
  /**
   * 设置当前页
   * @type {string}
   */
  static SET_SKIPCOUNT='SET_SKIPCOUNT';
  /**
   * 设置加载遮罩层是否显示
   * @type {string}
   */
  static  SET_LOADING='SET_LOADING';
  /**
   * 设置是否显示新增框
   * @type {string}
   */
  static  SET_AddFORMVISIBLE='SET_AddFORMVISIBLE';
  /**
   * 设置是否显示编辑框
   * @type {string}
   */
  static SET_EDITFORMVISIBLE='SET_EDITFORMVISIBLE';

}
