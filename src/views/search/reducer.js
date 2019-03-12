import $axios from '@assets/js/axios';
import {
  GET_SEARCH_ALL
} from '@store/actionTypes';

const stateDefault = {
  loadEnd: false,
  searchRecommend: '',
  searchHotWords: [],
  hotRecommend: [],
}

export function search(state=stateDefault, action) {
  switch(action.type) {
    case GET_SEARCH_ALL:
      return {
        ...state,
        ...action
      }
    default:
      return state;
  }
}

export const getSearchAll = () => {
  return dispatch => {
    $axios([
      {url: '/search_recommend'},
      {url: '/hot_search'},
      {url: '/hot_recommend'}
    ]).then(res => {
      dispatch({
        type: GET_SEARCH_ALL,
        searchRecommend: res[0].data,
        searchHotWords: res[1].searchHotWords.slice(0, 12),
        hotRecommend: res[2].newHotWords.slice(0, 10),
        loadEnd: true
      })
    })
  }
}
