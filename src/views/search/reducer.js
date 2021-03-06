import $axios from '@assets/js/axios';
import {
  GET_SEARCH_ALL,
  GET_SEARCH_SUGGEST,
  SET_CLEAN_SUGGEST,
  GET_SEARCH_RESULT,
  SET_CLEAN_RESULT,
  GET_BOOK_OTHER,
  SET_SHOW_SEARCH_RESULT,
  GET_SEARCH_CATE,
  GET_SEARCH_TAG,
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
  resultTotal: 0,
  searchCate: [],
  searchTag: [],
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
    case GET_SEARCH_CATE:
    case GET_SEARCH_TAG:
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
    // 可以在这包一层Promise，调用时可以使用then
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

export const getSearchResult = (opt, isClean) => {
  return (dispatch, getState) => {
    // 在action中调用action
    // 1. setCleanResult()(dispatch)
    // 2. dispatch({
    //      type: SET_CLEAN_RESULT,
    //      searchResult: []
    //    })
    return new Promise((resolve, reject) => {
      const data = {
        keyword: opt.keyword,
        start: opt.start || 0,
        limit: opt.limit || 10,
        type: opt.type || 1
      }
      if(opt.sort) data.sort = opt.sort;
      if(opt.cat) data.cat = opt.cat;
      if(opt.tag) data.tag = opt.tag;
      if(opt.isserial) data.isserial = opt.isserial;
      if(opt.price) data.price = opt.price;
      if(opt.wordCount) data.wordCount = opt.wordCount;

      const _searchResult = getState().search.searchResult;
      $axios({
        url: '/search_result',
        data
      }).then(res => {
        resolve(res)
        if (res.ok) {
          dispatch({
            type: GET_SEARCH_RESULT,
            searchResult: isClean ? res.books : [..._searchResult, ...res.books],
            showSearchResult: true,
            resultTotal: res.total,
          })
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export const setCleanResult = () => {
  return dispatch => {
    dispatch({
      type: SET_CLEAN_RESULT,
      searchResult: [],
      resultHasmore: true,
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

export const getCateTag = (query) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      $axios([
        {
          url: '/search_category',
          data: query[0]
        },
        {
          url: '/search_tags',
          data: query[0]
        }
      ]).then(res => {
        const newRes = res.map((item, index) => {
          return formatSearchArr(item.list)
        })
        resolve(newRes)
        dispatch({
          type: GET_SEARCH_CATE,
          searchCate: formatSearchArr(res[0].list),
          searchTag: formatSearchArr(res[1].list),
        })
      }).catch(err => {
        reject(err)
      })
    })
  }
}

// 普通函数
export function formatSearchArr(arr) {
  const newArr = []
  if(arr && arr.length) {
    arr.forEach((item, index) => {
      newArr.push({
        text: item,
        param: item,
        active: false
      })
    })
    return newArr;
  }
  return arr;
}
