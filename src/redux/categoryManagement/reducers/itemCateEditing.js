import * as Types from 'redux/categoryManagement/constants/ActionType';
var initialState = {};

const itemEditing = (state = initialState, action) => {
    switch(action.type){
        case Types.EDIT_CATEGORY:
            return action.Category;
        default :
            return state;
    }
}

export default itemEditing;