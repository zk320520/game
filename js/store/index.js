import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer';
import { middleware } from '../navigator/AppNavigator';

let logger = store => next => action => {
    if (typeof action === 'function') {
        console.log('dispatching a function');
    } else {
        console.log('dispatching ', action);
    }
    let result = next(action);
    console.log('nextState ', store.getState());
    return result;
};

let middlewares = [
    middleware,
    logger,
    thunk
];

export default createStore(reducers, applyMiddleware(...middlewares));