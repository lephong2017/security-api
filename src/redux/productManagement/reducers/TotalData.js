import * as Types from './../constants/ActionType';
var initialState = [0];

const totalData = (state = initialState, action) => {
    switch(action.type){
        case Types.TOTAL_PRODUCTS:
            return action.count;
        default :
            return state;
    }
}

export default totalData;