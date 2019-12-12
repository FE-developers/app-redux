/***
 * 快应用
 * redux
 * 数据流
 */
import createStore,{getStore} from './createStore';
import combineReducers from './combineReducers';
import compose from './compose';
import applyMiddleware from './applyMiddleware';
import connect from './connect';
import {initStorage,initLocalStorage,createLocalStorage} from './storage';

export {
    initStorage,
    initLocalStorage,
    createLocalStorage,
    getStore,
    combineReducers,
    createStore,
    compose,
    connect,
    applyMiddleware
};

export default {
    initStorage,
    initLocalStorage,
    createLocalStorage,
    getStore,
    combineReducers,
    createStore,
    connect,
    applyMiddleware,
    compose
};


