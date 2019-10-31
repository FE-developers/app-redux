import {SET_LOCAL_NUM,SET_NUM} from "../constants/test";

const INITIAL_STATE = {
  num: 0,
  local_num: 0
};

export default function(state = INITIAL_STATE,action){
  switch (action.type) {
    case SET_LOCAL_NUM:
      return {
        ...state,
        local_num: action.payload
      }
    case SET_NUM:
      return {
        ...state,
        num: action.payload
      }
    default:
      return state  
  }
}
