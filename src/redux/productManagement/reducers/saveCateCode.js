import * as Types from './../constants/ActionType';
var initialState = 'null';

const cateCode = (state = initialState, action) => {
    switch(action.type){
        case Types.SAVE_CATE_CODE:
            return action.cateCode;
        default :
            return state;
    }
}

export default cateCode;