import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { createReactNavigationReduxMiddleware, createReduxContainer } from 'react-navigation-redux-helpers';
import AuthLoadingPage from '../pages/Login/AuthLoadingPage';
import AuthPage from '../pages/Login/AuthPage';
import LoginPage from '../pages/Login/LoginPage';
import RegisterPage from '../pages/Login/RegisterPage';
import ConfirmPage from '../pages/Login/ConfirmPage';
import HomePage from '../pages/HomePage';

export let rootComponent = 'AuthLoading';

let AuthStack = createStackNavigator({
    Auth: {
        screen: AuthPage,
    },
    Login: {
        screen: LoginPage,
    },
    Register: {
        screen: RegisterPage,
    },
    Confirm: {
        screen: ConfirmPage,
    }
});

let AppStack = createStackNavigator({
    Home: {
        screen: HomePage,
        navigationOptions: {
            header: null,
        }
    },
});

export let RootNavigator = createSwitchNavigator(
    {
        AuthLoading: AuthLoadingPage,
        AuthStack: AuthStack,
        AppStack: AppStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
);

export let middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

let AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

let mapStateToProps = state => ({
    state: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);