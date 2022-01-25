import { combineReducers } from "redux";

import userAuthReducer from "./userAuth/userAuth.reducer";
import userActivateReducer from "./userActivate/userActivate.reducer";

const rootReducer = combineReducers({
    userAuth : userAuthReducer,
    userActivate : userActivateReducer
});

export default rootReducer;