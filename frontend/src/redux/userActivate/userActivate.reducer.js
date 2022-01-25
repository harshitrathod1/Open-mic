import userActivateTypes from "./userActivate.types";

const INITIAL_STATE = {
    name : '',
    avatar : ''
}

const userActivateReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case userActivateTypes.SET_NAME:
            return {
                ...currentState,
                name : action.payload
            }
        case userActivateTypes.SET_AVATAR:
            return {
                ...currentState,
                avatar : action.payload
            }
        default :
            return currentState;
    }
}

export default userActivateReducer;