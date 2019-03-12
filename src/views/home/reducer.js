import $axios from '@assets/js/axios';
import {
  ACTION_TEST,
  GET_JINXUAN_DATA,
  GET_SEARCH_RECOMMEND
} from '@store/actionTypes';

const stateDefault = {
  test: 'qweqweqwe',
  loadEnd: false,
  jingxuan: {},
  searchRecommend: '',
}

// reducer
export function home(state = stateDefault, action) {
  switch (action.type) {
    case ACTION_TEST:
      return {
        ...state,
        test: action.test
      }
    case GET_JINXUAN_DATA:
      return {
        ...state,
        ...action
      }
    case GET_SEARCH_RECOMMEND:
      return {
        ...state,
        searchRecommend: action.searchRecommend
      }
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
      url: '/jingxuan',
      data: {
        type: 'jx'
      }
    }).then(res => {
      if (res.ok) {
        dispatch({
          type: GET_JINXUAN_DATA,
          jingxuan: res.data,
          loadEnd: true,
        })
      }
    })
  }
}

export const getSearchRecommend = () => {
  return dispatch => {
    $axios({
      url: '/search_recommend'
    }).then(res => {
      if(res.ok) {
        dispatch({
          type: GET_SEARCH_RECOMMEND,
          searchRecommend: res.data.title
        })
      }
    })
  }
}
