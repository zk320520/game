import { Platform } from 'react-native';
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
        navigationOptions: {
            header: null,
        }
    },
    Login: {
        screen: LoginPage,
        navigationOptions: {
            header: null,
        }
    },
    Register: {
        screen: RegisterPage,
        navigationOptions: {
            header: null,
        }
    },
    Confirm: {
        screen: ConfirmPage,
        navigationOptions: {
            header: null,
        }
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

export let RootNavigator = createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingPage,
        AppStack: AppStack,
        AuthStack: AuthStack,
    },
    {
        initialRouteName: 'AuthLoading',
    }
));

export let middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

let AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

let mapStateToProps = state => ({
    state: state.nav
});

export default connect(mapStateToProps)(AppWithNavigationState);