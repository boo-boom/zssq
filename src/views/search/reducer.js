import $axios from '@assets/js/axios';
import {
  GET_SEARCH_ALL,
  GET_SEARCH_SUGGEST,
  SET_CLEAN_SUGGEST,
  GET_SEARCH_RESULT,
  SET_CLEAN_RESULT,
  GET_BOOK_OTHER,
  SET_SHOW_SEARCH_RESULT,
} from '@store/actionTypes';

const stateDefault = {
  loadEnd: false,
  searchRecommend: '',
  searchHotWords: [],
  hotRecommend: [],
  searchSuggest: [],
  searchResult: [],
  bookSuggest: [],
  showSearchResult: false,
}

export function search(state=stateDefault, action) {
  switch(action.type) {
    case GET_SEARCH_ALL:
    case GET_SEARCH_SUGGEST:
    case SET_CLEAN_SUGGEST:
    case GET_SEARCH_RESULT:
    case SET_CLEAN_RESULT:
    case GET_BOOK_OTHER:
    case SET_SHOW_SEARCH_RESULT:
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
    // 可以在这包一层prosime，调用时可以使用then
    // return new Promise((resolve, reject) => {
      $axios([
        {url: '/search_recommend'},
        {url: '/hot_search'},
        {url: '/hot_recommend'}
      ]).then(res => {
        // resolve(res)
        dispatch({
          type: GET_SEARCH_ALL,
          searchRecommend: res[0].data,
          searchHotWords: res[1].searchHotWords.slice(0, 12),
          hotRecommend: res[2].newHotWords.slice(0, 10),
          loadEnd: true
        })
      })
    // })
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

export const getSearchResult = (keyword, contentType) => {
  return dispatch => {
    // 在action中调用action
    // 1. setCleanResult()(dispatch)
    // 2. dispatch({
    //      type: SET_CLEAN_RESULT,
    //      searchResult: []
    //    })
    $axios({
      url: '/search_result',
      data: {
        keyword: keyword,
        start: 0,
        limit: 2,
        type: contentType
      }
    }).then(res => {
      if (res.ok) {
        dispatch({
          type: GET_SEARCH_RESULT,
          searchResult: res.books,
          showSearchResult: true,
        })
      }
    })
  }
}
export const setCleanResult = () => {
  return dispatch => {
    dispatch({
      type: SET_CLEAN_RESULT,
      searchResult: []
    })
  }
}

export const getBooksOther = (query) => {
  return dispatch => {
    $axios([
      {url: '/auto_suggest', data: {query}}
    ]).then(res => {
      dispatch({
        type: GET_BOOK_OTHER,
        bookSuggest: res[0].keywords
      })
    })
  }
}

export const setShowSearchResult = (show) => {
  return dispatch => {
    dispatch({
      type: SET_SHOW_SEARCH_RESULT,
      showSearchResult: show
    })
  }
}
