import userActivateTypes from "./userActivate.types";

export const setName = (data) => ({
    type : userActivateTypes.SET_NAME,
    payload : data
});

export const setAvatar = (data) => ({
    type : userActivateTypes.SET_AVATAR,
    payload : data
});