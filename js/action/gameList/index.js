import Types from '../types';

export function onGameListSuccess(gameList) {
    return { type: Types.GAMELIST_SUCCESS, gameList };
};