import Types from '../types';

export function onLoginSuccess(userInfo) {
    return { type: Types.LOGIN_SUCCESS, userInfo };
};

export function onLoginOut() {
    return { type: Types.LOGIN_OUT };
};

export function onRegisterTemp(tempInfo) {
    return { type: Types.RESGISTER_TEMP, tempInfo };
};

export function onRegisterSuccess(userInfo) {
    return { type: Types.RESGISTER_SUCCESS, userInfo };
}
