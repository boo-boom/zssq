import $axios from '@assets/js/axios';
import { ACTION_TEST, GET_JINXUAN_DATA } from '@store/actionTypes';

const stateDefault = {
  test: 'qweqweqwe',
  jingxuan: {}
}

// reducer
export function home (state=stateDefault, action) {
  switch(action.type) {
    case ACTION_TEST:
      return {...state, test: action.test}
    case GET_JINXUAN_DATA:
      return {...state, jingxuan: action.jingxuan}
    default:
      return state;
  }
}

// action
export const getTest = () => {
  return dispatch => {
    dispatch({
      type: ACTION_TEST,
      test: 123
    })
  }
}

export const getJinxuanData = () => {
  return dispatch => {
    $axios({
      url:'/jingxuan',
      data: { type: 'jx' }
    }).then(res => {
      if(res.data.ok) {
        dispatch({
          type: GET_JINXUAN_DATA,
          jingxuan: res.data.data
        })
      }
    })
  }
}

