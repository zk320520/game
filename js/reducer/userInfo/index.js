import Types from '../../action/types';

const defaultState = {
    Phone: "",
    LoginHistory: [],
    BankBranch: "",
    LoginCount: 0,
    Active: false,
    Admin: false,
    BankName: "",
    InitDeposited: false,
    CountryCode: "",
    HashPassword: "",
    BankAccount: "",
    Avatar: "",
    Uid: "",
    Referrer: "",
    Email: "",
    docId: "",
    Name: "",
    CreatedAt: "",
    IntroCode: "",
    BankVerify: false,
    BankImg: "",
    token: ""
};

export default function (state = defaultState, action) {
    switch (action.type) {
        case Types.LOGIN_SUCCESS:
        case Types.RESGISTER_SUCCESS:
            return {
                ...state,
                ...action.userInfo
            };
        case Types.LOGIN_OUT: 
            return {
                ...state,
                ...defaultState
            };
        case Types.RESGISTER_TEMP: 
            return {
                ...state,
                ...action.tempInfo
            };
        default:
            return state;
    }
};