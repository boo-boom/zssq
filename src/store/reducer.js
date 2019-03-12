import { combineReducers } from 'redux';
import { home } from '@views/home/reducer';
import { search } from '@views/search/reducer';

export default combineReducers({
  home,
  search
})
