import $axios from '@assets/js/axios';
import {
  GET_SEARCH_ALL,
  GET_SEARCH_SUGGEST,
  SET_CLEAN_SUGGEST
} from '@store/actionTypes';

const stateDefault = {
  loadEnd: false,
  searchRecommend: '',
  searchHotWords: [],
  hotRecommend: [],
  searchSuggest: [],
}

export function search(state=stateDefault, action) {
  switch(action.type) {
    case GET_SEARCH_ALL:
    case GET_SEARCH_SUGGEST:
    case SET_CLEAN_SUGGEST:
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

export const getSearchSuggest = (keyword) => {
  return dispatch => {
    $axios({
      url: '/search_suggest',
      data: {
        keyword: keyword
      }
    }).then(res => {
      if (res.ok) {
        dispatch({
          type: GET_SEARCH_SUGGEST,
          searchSuggest: res.keywords
        })
      }
    })
  }
}

export const setCleanSuggest = () => {
  return dispatch => {
    dispatch({
      type: SET_CLEAN_SUGGEST,
      searchSuggest: ''
    })
  }
}
