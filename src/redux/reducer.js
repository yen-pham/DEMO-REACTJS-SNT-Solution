import * as constant from "./constant"

const initialState = {
    animals: [],
    loading:false,
    authen: false,
    loginStatus: "",
    token: "",
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case constant.LOGIN_SUCCESS:
            localStorage.setItem("authen", action.payload)
            return {
                ...state,
                authen: true,
                token: action.payload
            };
        case constant.LOGIN_FAIL:
            return {
                ...state,
                loginStatus: action.payload
            };
        case constant.ISAUTHEN:
            console.log(action.payload);
            return {
                ...state,
                authen: true,
                token: action.payload
            };
        case constant.NOAUTHEN:
            return {
                ...state,
            };
    }}

export default rootReducer;