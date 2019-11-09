import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './js/store';
import AppNavigator from './js/navigator/AppNavigator';
import { Provider as DesginProvider } from '@ant-design/react-native';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <DesginProvider theme={theme}>
                    <AppNavigator />
                </DesginProvider>
            </Provider>
        );
    }
}

// 全局主题
const theme = {
    tabs_height: 30,
    border_color_base: 'transparent',
};
