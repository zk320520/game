import { combineReducers } from 'redux';
import { rootComponent, RootNavigator } from '../navigator/AppNavigator';
import userInfo from './userInfo';
import gameList from './gameList';

let navState = RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(rootComponent));

let navReducer = (state = navState, action) => {
    let nextState = RootNavigator.router.getStateForAction(action, state);
    return nextState || state;
}

export default index = combineReducers({
    nav: navReducer,
    userInfo: userInfo,
    gameList: gameList,
});