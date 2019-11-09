import Types from '../../action/types';

const defaultState = [];

export default function (state = defaultState, action) {
    switch (action.type) {
        case Types.GAMELIST_SUCCESS:
            return [
                ...state,
                ...action.gameList
            ];
        default:
            return state;
    }
};