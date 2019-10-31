# quick-redux

quick redux is quickapp global state  management. fully support the redux grammar

快应用redux状态管理库，完全支持redux语法，便于项目redux迁移

## usage 用法
```javascript
npm install app-redux --save 或 cnpm install app-redux --save
```

### 新增API
#### createLocalStorage
```javascript
// actions => 需要缓存的 action.type 名称，详细请看示例
createLocalStorage(actions)
```
#### initStorage
```javascript
// store => redux 实例
initLocalStorage(store);
```


### store.js
```javascript
import {createStore, applyMiddleware, compose,createLocalStorage} from 'app-redux';

// 开启本地缓存策略，不需要可以去除
import {createLocalStorage} from 'app-redux/storage';

import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
import {SET_NUM,SET_LOCAL_NUM} from '../constants/test';

// 需要缓存的操作名
const actions = [
  SET_LOCAL_NUM
];

const middlewares = [
  thunkMiddleware,
  createLogger(),
  createLocalStorage(actions)
];

const enhancer = compose(
  applyMiddleware(...middlewares),
  // other store enhancers if any
);

export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  
  return store;
}
```

### app.ux
```html
<script>
  const injectRef = Object.getPrototypeOf(global) || global;
  injectRef.regeneratorRuntime = require('@babel/runtime/regenerator');
  import {initLocalStorage} from './store/storage'
  import configStore from './store'
  const store = configStore()

  /**
   * 应用级别的配置，供所有页面公用
   * 如果需要缓存配置，请执行完善缓存逻辑
   */
  export default {
    async onCreate() {
      // 初始化本地数据
      await initLocalStorage(store)
    }
  }
</script>
```

### page
```html
<template>
    <div class='index'>
        <div class='group'>
            <text class='add' @click='addNum'>测试 num +</text>
            <text>{{num}}</text>
            <text class='reduce' @click='reduceNum'>测试 num -</text>
        </div>
        <div class='group'>
            <text class='add' @click='addLocalNum'>测试 local_num +</text>
            <text>{{local_num}}</text>
            <text class='reduce' @click='reduceLocalNum'>测试 local_num -</text>
        </div>
    </div>
</template>
<script>
import {connect} from 'app-redux';
import {setNum,setLocalNum} from '../../store/actions/test.js';

const store = connect(({test:{num,local_num}}) => ({
    num,
    local_num
}),dispatch => ({
    addNum(){
        return dispatch(setNum(this.num + 1))
    },
    reduceNum(){
        return dispatch(setNum(this.num - 1))
    },
    addLocalNum(){
        return dispatch(setLocalNum(this.local_num + 1))
    },
    reduceLocalNum(){
        return dispatch(setLocalNum(this.local_num - 1))
    }
}));

export default store({
    onInit() {
        
    }
});
</script>

```



