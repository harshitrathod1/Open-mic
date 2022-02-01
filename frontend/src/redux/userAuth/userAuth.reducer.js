import userAuthActionTypes from "./userAuth.types";

//Initial State
const INITIAL_STATE = {
    isAuth : false,
    userDetails : null,
    otp : {
        phone : '',
        hash : '',
        email: '',
    },
}

const userAuthReducer = (currentState = INITIAL_STATE, action) => {
    switch(action.type){
        case userAuthActionTypes.SET_AUTH : 
            const { user } = action.payload;
            if(user === null){
                return {
                    ...currentState,
                    userDetails : user,
                    isAuth : false,
                }
            }else{
                return {
                    ...currentState,
                    userDetails : user,
                    isAuth : true
                };
            }
        
        case userAuthActionTypes.SET_OTP :
            return {
                ...currentState,
                otp : action.payload
            }

        default : 
            return currentState
    }
}

export default userAuthReducer;