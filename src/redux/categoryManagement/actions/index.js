import * as Types from 'redux/categoryManagement/constants/ActionType';
import {callApis} from 'utils/securityAPI/apiCaller';
// import callApis from 'utils/CallAPI/apiCaller';

export const   actFetchCategoryRequest = (pageSize,pageIndex,StringFilter) => {
    var total =0;
    callApis(`/RefProductCategories/CountCategoryFilter/${StringFilter}/false`, 'GET', null).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
         return callApis(`RefProductCategories/FilterCategory/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then((a)=>{
            dispatch(actFetchCategory(a.data,pageIndex,pageSize,total));
            dispatch(actFetching(false));
        });
    };
};

export const actFetchCategory = (Category,pageIndex,pageSize,totalData) => {
    return {
        type: Types.FETCH_CATEGORYS,
        Category,
        pageIndex,
        pageSize,
        totalData
    }
};
export const actFetchCategoryFilter = (Category,pageSize,pageIndex,totalData) => {
    return {
        type: Types.FETCH_CATEGORYS_FILTER,
        Category,
        pageSize,
        pageIndex,
        totalData
    }
};
export const actFetching = (isFetching) => {
    return {
        type: Types.IS_FETCHING_CATE,
       isFetching
    }
};


export const searchCategoryRequest = (pageSize,pageNow,keywork) => {
    console.log(keywork+" is search with word ");
    var total =0;
    callApis(`/RefProductCategories/CountCategoryFilter/${keywork}/true`, 'GET', null).then(res => {
        total = res.data;
    });
    return (dispatch) => {
        dispatch(actFetching(true));
        return callApis(`/RefProductCategories/FilterCategory/${pageSize}/${pageNow}/${keywork}`, 'GET', null).then(res => {
            dispatch(actFetchCategoryFilter(res.data,pageSize,pageNow,total));
            dispatch(actFetching(false));
        });
    }
};

export const actAddCategoryRequest = (Category) => {
    return (dispatch) => {
        return callApis('RefProductCategories/createRefProductCategories', 'POST', Category).then(res => {
            console.log(res.data);
            if(res.data===true){
                dispatch(actAddCategory(Category));
            }
        }).catch(error => console.log("Fetch Error "+ error));
    }
}

export const actAddCategory = (Category) => {
    return {
        type: Types.ADD_CATEGORY,
        Category
    }
}

export const actUpdateCategoryRequest = (Category,pageIndex,pageSize,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`RefProductCategories/editRefProductCategories/id?id=${Category.cateId}`, 'PUT', Category).then(res => {
            var total =0;
            callApis(`/RefProductCategories/CountCategoryFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApis(`RefProductCategories/FilterCategory/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter==="ALL"||StringFilter===0){
                    dispatch(actFetchCategory(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCategoryFilter(res.data,pageSize,pageIndex,total));
                }
            });
        });
    }
}

export const actUpdateCategory = (Category) => {
    return {
        type: Types.UPDATE_CATEGORY,
        Category
    }
}

export const actDeleteCategoryRequest = (id,pageSize,pageIndex,StringFilter) => {
    var condition = (StringFilter===0||StringFilter==="ALL"||StringFilter==='')?false:true;
    return (dispatch) => {
        return callApis(`RefProductCategories/deleteRefProductCategories?id=${id}`, 'DELETE', null).then(res => {
            var total =0;
            callApis(`/RefProductCategories/CountCategoryFilter/${StringFilter}/${condition}`, 'GET', null).then(res => {
                total = res.data;
            });
            return callApis(`RefProductCategories/FilterCategory/${pageSize}/${pageIndex}/${StringFilter}`, 'GET', null).then(res => {
                if(StringFilter===''||StringFilter===0||StringFilter==="ALL"){
                    dispatch(actFetchCategory(res.data,pageIndex,pageSize,total));
                }else{
                    dispatch(actFetchCategoryFilter(res.data,pageSize,pageIndex,total));
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
};

export const actDeleteCategory = (id) => {
    return {
        type: Types.DELETE_CATEGORY,
        id
    }
}

export const actGetCategoryRequest = (id) => {
    return dispatch => {
        return callApis(`RefProductCategories/getFindIDRefProductCategories/id?id=${id}`, 'GET', null).then(res => {
            console.log(res.data);
            dispatch(actGetCategory(res.data));
        });
    }
}

export const actGetCategory = (Category) => {
    return {
        type : Types.EDIT_CATEGORY,
        Category
    }
}


