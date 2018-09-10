import * as Types from './../constants/ActionType';

var initialState = [];

const categorys = (state = initialState, action) => {
    // var { category, id } = action;
    // var index = -1;
    switch (action.type) {
        case Types.FETCH_CATEGORYS:
            // if([...action.category]===undefined){
            //     console.log("null adadas");
            //     var cate ={
            //         product:[],
            //         productCategoryCode :"0323EQ",
            //         productCategoryDescription:"Cash",
            //     }
            //     return [...action.category.push(cate)];
            // }
            return [...action.category];
        
        default: return [...state];
    }
};


export default categorys;