import * as Types from './../constants/ActionType';
import {callApis} from 'utils/securityAPI/apiCaller';
export const actFetchCategoryProductRequest = () => {
    var resData = callApis(`RefProductCategories/getAllRefProductCategories`, 'GET', null);
    return (dispatch) => {
            // console.log(res.data);
            Promise.resolve(resData).then((a)=>{
                dispatch(actFetchCategoryProduct(a));
            });
    }
};
export const actFetchCategoryProduct = (category) => {
    return {
        type: Types.FETCH_CATEGORYS_ALL,
        category
    }
};