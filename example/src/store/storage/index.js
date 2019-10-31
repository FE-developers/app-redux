const injectRef = Object.getPrototypeOf(global) || global;

injectRef.regeneratorRuntime = require('@babel/runtime/regenerator');

import storageAPIDefault from '@system.storage';

export const createKey = type => `action:${type}`;


// 创建本地缓存
export const createLocalStorage = (storage = [], storageAPI = storageAPIDefault) => {
  // 创建全局缓存
  injectRef.storage = storage;
  return () => {
    return next => {
      return action => {

        const isStorage = storage.find(item => item === action.type);

        // 允许存储
        if (isStorage && action.payload !== undefined) {
          storageAPI.set({
            value: action.payload,
            key: createKey(action.type),
            complete: () => next(action)
          });
          return;
        } else if (isStorage) {
          console.error('当前 action 存储失败，没有设置对应的 payload');
        }
        return next(action)
      };
    }
  }
};

// 初始化本地缓存
export const initLocalStorage = async (store,storageAPI = storageAPIDefault) => {
  const storage = injectRef.storage;
  for (let i = 0; i < storage.length; i++) {
    const type = storage[i];
    const key = createKey(type);
    const info = await new Promise(resolve => {
      storageAPI.get({
        key,
        success(data) {
          try {
            data = JSON.parse(data);
          } catch (e) {
            e;
          }
          resolve({data});
        }
      });
    });

    // 状态请设置 boolean 或 0
    if (info && info.data !== undefined && info.data !== null && info.data !== '') await store.dispatch({
      type,
      payload: info.data
    });
  }
};
