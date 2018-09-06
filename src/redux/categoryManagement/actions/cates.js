import * as Types from './../constants/ActionType';
import {callApis} from 'utils/securityAPI/apiCaller';
// import callApi from 'utils/CallAPI/apiCallerS';
export const actFetchCategoryProductRequest = () => {
    return (dispatch) => {
           return callApis(`RefProductCategories/getAllRefProductCategories`, 'GET', null).then((a)=>{
                // console.log(a.data);    
                dispatch(actFetchCategoryProduct(a.data));
            });
    }
};
export const actFetchCategoryProduct = (category) => {
    return {
        type: Types.FETCH_CATEGORYS_ALL,
        category
    }
};