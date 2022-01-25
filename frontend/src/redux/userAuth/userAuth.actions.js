import userAuthActionTypes from "./userAuth.types";

export const setAuth = (data) => ({
    type: userAuthActionTypes.SET_AUTH,
    payload : data
})

export const setOtp = (data) => ({
    type : userAuthActionTypes.SET_OTP,
    payload : data
})