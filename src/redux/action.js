import * as constant from "./constant"

export const isAuthenAction = (token) => ({
    type: constant.ISAUTHEN,
    payload: token
});

export const noAuthenAction = () => ({
    type: constant.NOAUTHEN
});

export const checkAuthenAction = () => {
    return dispatch => {
        localStorage.getItem('authen') ? dispatch(isAuthenAction(localStorage.getItem('authen'))) : dispatch(noAuthenAction());
    }
};

export const loginFailAction = error => ({
    type: constant.LOGIN_FAIL,
    payload: error
});

export const loginSuccessAction = data => ({
    type: constant.LOGIN_SUCCESS,
    payload: data
});

export const loginAction = (id, secret) => {
    return dispatch => {
        if(id.trim() && secret.trim()){
            fetch('https://api.petfinder.com/v2/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_secret: id,
                client_id: secret,
                grant_type: "client_credentials"
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data?.errors ? dispatch(loginFailAction("Đăng nhập thất bại!")):dispatch(loginSuccessAction(data.access_token));
            })
            .catch((error) => {
                console.error('Errors:', error);
            });
        }
        else  dispatch(loginFailAction("Vui lòng không để trống!"))
        
    }
};
