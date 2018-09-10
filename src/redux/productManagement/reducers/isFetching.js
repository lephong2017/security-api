import * as Types from './../constants/ActionType';

const isFetching = (state = false, action) => {
    switch (action.type) {
        case Types.IS_FETCHING:
            return action.isFetching;
        
        default: return state;
    }
};

export default isFetching;