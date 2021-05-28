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
        if (localStorage.getItem('authen')) {
            let dataToken = localStorage.getItem('authen').split('.')[1];
            let dateEpx = -1;
            dataToken && (dateEpx = JSON.parse(atob(dataToken)).exp*1000 - Date.now());
            dateEpx > 0 ? dispatch(isAuthenAction(localStorage.getItem('authen'))) : localStorage.removeItem("authen");
        } else dispatch(noAuthenAction());
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
        if (id.trim() && secret.trim()) {
            fetch('https://api.petfinder.com/v2/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_secret: secret,
                    client_id: id,
                    grant_type: "client_credentials"
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data);
                    data?.errors ? dispatch(loginFailAction("Đăng nhập thất bại!")) : dispatch(loginSuccessAction(data.access_token));
                })
                .catch((error) => {
                    console.error('Errors:', error);
                });
        }
        else dispatch(loginFailAction("Vui lòng không để trống!"))

    }
};

export const getAnimalsPendingAction = () => ({
    type: constant.GET_ANIMALS_PENDING
});

export const getAnimalsSuccessAction = data => ({
    type: constant.GET_ANIMALS_SUCCESS,
    payload: data
});

export const getAnimalsFailAction = error => ({
    type: constant.GET_ANIMALS_FAIL,
    payload: error
});

export const getAnimalsAction = (page) => {
    let token = localStorage.getItem('authen');
    return dispatch => {
        dispatch(getAnimalsPendingAction())
        fetch('https://api.petfinder.com/v2/animals?page=' + page, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
        })
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                dispatch(getAnimalsSuccessAction(data))
            })
            .catch((error) => {
                console.error('Errors:', error);
                dispatch(getAnimalsFailAction())
            });
    }
};

export const logoutAction = () => ({
    type: constant.LOGOUT
});
