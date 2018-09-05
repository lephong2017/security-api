import * as Types from 'redux/categoryManagement/constants/ActionType';

var arr =[]
var catesData = [];
const products = (state = catesData, action) => {
    var { product } = action;
    var index = -1;
    var arrTemp=[];
    switch (action.type) {
        case Types.FETCH_CATEGORYS:
            var sumTotal = action.totalData;
             arrTemp = new Array(sumTotal);
            arrTemp.fill(0);
            var pageId=action.pageIndex;
            if(pageId===1){
                for (let i = 0; i < action.Category.length; i++) {
                    arrTemp[i]=action.Category[i];
                } 
                arr=arrTemp; 
                return arrTemp;
            }
            var pageSize = action.pageSize;
            for (var i = 0; i < action.Category.length; i++) {
               arr[(pageId-1)*pageSize+i]=action.Category[i];
            }
            return arr;
        case Types.FETCH_CATEGORYS_FILTER:
            var sumData = action.totalData;
            // console.log(sumData+" is total data filter");
             arrTemp = new Array(sumData);
            arrTemp.fill(0);
            if(action.pageIndex===1){
                for (let i = 0; i < action.Category.length; i++) {
                    arrTemp[i]=action.Category[i];
                }
                catesData=arrTemp;
                return catesData;
            } 
            for (let i = 0; i < action.Category.length; i++) {
                catesData[(action.pageIndex-1)*action.pageSize+i]=action.Category[i];
                
            }
            //copy productData vao arrTemp sau do gan lai cho productData
            return catesData;
        case Types.UPDATE_CATEGORY:
            arr=[];
            catesData=[];
            index = findIndex(state, product.productId);
            state[index] = product;
            return [...state];
        case Types.DELETE_CATEGORY:
            return [...arr];
        case Types.FETCH_CATEGORYS_ALL:
            // console.log("abababababa");
            // console.log(action.category);
            // console.log("abababababa");
            return action.category;
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

    export default products;



