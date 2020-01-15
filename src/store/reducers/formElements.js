import * as actionsTypes from '../actions/actionTypes';

const initialState = {
    enteredTitle: '',
    enteredAmount: ''
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsTypes.TYPE_TITLE:
            return {
                ...state,
                enteredTitle: action.enteredTitle
            }
        case actionsTypes.TYPE_AMOUNT:
            return {
                ...state,
                enteredAmount: action.enteredAmount
            }
        default: break;

    }
    return state;
}
export default reducer;