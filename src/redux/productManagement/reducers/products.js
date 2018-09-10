import * as Types from './../constants/ActionType';

var arr =[]
var productsData = [];
const products = (state = productsData, action) => {
    var { product, id } = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.GET_ALL_PRODUCT:
            return [...action.product];
        case Types.FETCH_PRODUCTS:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.products.length; i++) {
                    arrTemp[i]=action.products[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.products.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.products[i];
            }
            return arr;
        case Types.FETCH_PRODUCTS_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.products.length; i++) {
                    arrTemp[i]=action.products[i];
                }
                productsData=arrTemp;
                return productsData;
            } 
            for (let i = 0; i < action.products.length; i++) {
                productsData[(action.pageIndex-1)*action.pageSize+i]=action.products[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return productsData;
        case Types.SEARCH_PRODUCTS:
            var objPageData={
                isFetchData:true,
                data:[...action.products],
            }
            productsData.set(action.pageIndex,objPageData);
            return productsData;
        
        case Types.ADD_PRODUCT:
            arr=[];
            productsData=[];
            state.push(product);
            return [...state];
        case Types.UPDATE_PRODUCT:
            arr=[];
            productsData=[];
            index = findIndex(state, product.productId);
            state[index] = product;
            return [...state];
        case Types.DELETE_PRODUCT:
            return [...arr];
        case Types.FIND_PRODUCT_BY_CATEID:
            var arrPositionProductByCateID = findIndexCate(action.product,id);
            var arrProductByCate=[];
            arrPositionProductByCateID.forEach((posProduct,index)=>{
                arrProductByCate[index]=action.product[posProduct];
            });
            return arrProductByCate;
        default: return [...state];
        }
    };

var findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
        if (product.productId === id) {
            result = index;
        }
    });
    return result;
}

var findIndexCate = (products, id) => {
    var result = [];
    products.forEach((product, index) => {
        if (product.productCategoryCode === id) {
            result.push(index);
        }
    });
    return result;
}
export default products;



