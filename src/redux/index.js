import { combineReducers } from 'redux';

import categorys_index from './categoryManagement/reducers/cate_index';
import isFetchingCategory from './categoryManagement/reducers/isFetching';
import itemCateEditing from './categoryManagement/reducers/itemCateEditing';

const appReducers = combineReducers({
    categorys_index,isFetchingCategory,itemCateEditing,
});

export default appReducers;