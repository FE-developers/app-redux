const injectRef = Object.getPrototypeOf(global) || global;
import {getStore} from './createStore';

// 全局变量，保证页面销毁时不被销毁
if(!injectRef._FUNCTION) injectRef._FUNCTION = {};

/***
 * dispatch封装
 */
const listenDispatch = function (methods) {
  // 快应用在页面销毁时会将关联函数一并销毁
  // 所以这里的操作必须做一个引用关系
  // 保证函数在页面销毁后继续函数执行
  // 这里涉及到上个页面和下个页面函数冲突问题
  Object.keys(methods).forEach(name => {
    const fn = methods[name];

    // 这里需要一个入栈出栈，保证顺序
    if(!injectRef._FUNCTION[name]) injectRef._FUNCTION[name] = [];

    injectRef._FUNCTION[name].push(fn);

    // 推出,只保存最近3个页面的操作
    while(injectRef._FUNCTION[name].length > 3) injectRef._FUNCTION[name].shift();

    methods[name] = injectRef._FUNCTION[name][injectRef._FUNCTION[name].length-1];
  });
  return methods;
};


const store = getStore();

/***
 * 修饰符
 */
export default function connect(mapState, mapDispatch) {

  // 初始状态
  const state = mapState ? mapState(store.getState()) : {};

  /***
   * 每次 dispatch
   * 都应该被处理
   */
  const methods = listenDispatch(mapDispatch ? mapDispatch(store.dispatch) : {});

  return function (conf) {

    function init(){
      const sub = () => {
        // 每次执行完成执行更新操作
        const newState = mapState ? mapState(store.getState()) : {};
        if (!newState) return;
        Object.keys(newState).forEach(name => {
          state[name] = newState[name];
          this[name] = state[name];
        });
      };
      // dispacth 订阅
      store.subscribe(() => {
        Promise.resolve().then(sub);
      });
      sub();
    }
    const computedConf = Object.assign({
      // dispatch注册
      ...methods,
      ...conf,
      // onInit onShow 任意执行一次
      onInit() {
        if(!this.__loading) {
          this.__loading = true;
          init.call(this,...arguments);
        }
        return conf.onInit && conf.onInit.call(this, ...arguments);
      },
      // onInit onShow 任意执行一次
      onShow() {
        if(!this.__loading) {
          this.__loading = true;
          init.call(this,...arguments);
        }
        return conf.onShow && conf.onShow.call(this, ...arguments);
      }
    });

    // 使用新特性
    if (computedConf.private) {
      computedConf.protected = {
        ...state,
        ...conf.private
      }
    } else {
      if (!conf.data) conf.data = {};
      computedConf.data = {
        ...state,
        ...conf.data
      }
    }

    return computedConf;
  }
}
