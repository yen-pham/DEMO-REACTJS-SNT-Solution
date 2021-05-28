import * as constant from "./constant"

const initialState = {
    animals: [],
    loading: false,
    authen: false,
    loginStatus: "",
};
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case constant.LOGIN_SUCCESS:
            localStorage.setItem("authen", action.payload);
            return {
                ...state,
                authen: true,
            };
        case constant.LOGIN_FAIL:
            return {
                ...state,
                loginStatus: action.payload
            };
        case constant.ISAUTHEN:
            return {
                ...state,
                authen: true,
            };
        case constant.NOAUTHEN:
            return {
                ...state,
            };
        case constant.GET_ANIMALS_PENDING:
            return {
                ...state,
                loading: true
            };
        case constant.GET_ANIMALS_SUCCESS:
            return {
                ...state,
                loading: false,
                animals: action.payload.animals,
                pageTotal: action.payload.pagination.total_pages,
            };
        case constant.GET_ANIMALS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
                animals: [],
                pageTotal: 0
            };
        case constant.LOGOUT:
            localStorage.removeItem("authen");
            return {
                ...state,
                authen: false,
            };
    }
}

export default rootReducer;