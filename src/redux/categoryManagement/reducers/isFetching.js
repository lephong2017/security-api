import * as Types from 'redux/categoryManagement/constants/ActionType';

const isFetching = (state = false, action) => {
    switch (action.type) {
        case Types.IS_FETCHING_CATE:
            return action.isFetching;
        
        default: return state;
    }
};

export default isFetching;