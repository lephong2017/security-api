import * as Types from './../constants/ActionType';
import {callApis} from 'utils/securityAPI/apiCaller';
import {adminrole,userrole,admin} from 'settings/Role/';

// import callApi from 'utils/CallAPI/apiCallerS';
export const actFetchCategoryProductRequest = () => {
    return   (dispatch) => {
            dispatch(actFetching(true));
          return  callApis(`RefProductCategories/getAllRefProductCategories`, 'GET', null).then( (a)=>{
                // console.log(a.data);    
                dispatch(actFetchCategoryProduct(a.data));
                dispatch(actFetching(false));
            });
        }
};
export const actFetching = (isFetching) => {
    return {
        type: Types.IS_FETCHING_CATE,
       isFetching
    }
};
export const actFetchCategoryProduct = (category) => {
    return {
        type: Types.FETCH_CATEGORYS_ALL,
        category
    }
};
export const setScopeAccess=(scope)=>{
    return (dispatch)=>{
       (scope==='adminrole')? scope=adminrole  : (scope==='userrole')? scope=userrole:scope=admin;
        dispatch(actSetScopeUser(scope));
    }
}
export const actSetScopeUser = (scope) => {
    return {
        type: Types.SET_SCOPE,
        scope
    }
};