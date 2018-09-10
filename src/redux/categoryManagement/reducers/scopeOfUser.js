import * as Types from 'redux/categoryManagement/constants/ActionType';
var init =["READ"];
const scopeOfUser = (state = init, action) => {
    switch (action.type) {
        case Types.SET_SCOPE:
            return action.scope;
        
        default: return state;
    }
};

export default scopeOfUser;