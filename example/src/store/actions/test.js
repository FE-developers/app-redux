import {SET_NUM,SET_LOCAL_NUM} from '../constants/test';

export const setNum = num => {
  return {
    type: SET_NUM,
    payload: num
  };
};

export const setLocalNum = num => {
  return {
    type: SET_LOCAL_NUM,
    payload: num
  };
};
