
import {createStore, applyMiddleware, compose} from 'app-redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import {createLogger} from 'redux-logger'
import {createLocalStorage} from 'app-redux/storage'
import actions from './storage/actions';

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
