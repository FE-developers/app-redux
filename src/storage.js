const injectRef = Object.getPrototypeOf(global) || global;
export const createKey = type => `action:${type}`;

// 创建本地缓存
export const createLocalStorage = (storage = [], storageAPI = storageAPIDefault) => () => {
  injectRef.storage = storage;
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
      } else if (isStorage) {
        console.error('当前 action 存储失败，没有设置对应的 payload');
      }
      return next(action)
    };
  }
};

// 初始化本地缓存
export const initStorage = (store = [], storageAPI = storageAPIDefault) => {
  const storage = injectRef.storage;

  return Promise.all(storage.map(type => {
    const key = createKey(type);

    return new Promise(resolve => {
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
    }).then(info => {
      if (info && info.data !== undefined && info.data !== null && info.data !== '') {
        return new Promise(resolve => {
          try {
            store.dispatch({
              type,
              payload: info.data
            }).then(() => {
              resolve();
            });
          } catch (e) {
            store.dispatch({
              type,
              payload: info.data
            });
            resolve();
          }
        });
      }
    });

  }));
};

export const initLocalStorage = initStorage;
