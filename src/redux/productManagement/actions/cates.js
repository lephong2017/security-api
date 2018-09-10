import * as Types from './../constants/ActionType';
// import callApi from '../../../utils/CallAPI/apiCaller';

import {callApis} from 'utils/securityAPI/apiCaller';
export const actFetchCategoryProductRequest = () => {
    return (dispatch) => {
        return callApis('RefProductCategories/getAllRefProductCategories', 'GET', null).then(res => {
            dispatch(actFetchCategoryProduct(res.data));
        });
    }
};
export const actFetchCategoryProduct = (category) => {
    return {
        type: Types.FETCH_CATEGORYS,
        category
    }
};