import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import DynamicTabNavigator from '../navigator/DynamicTabNavigator';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
    }

    _onBackPress = () => {
        let { dispatch, nav } = this.props;
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    render() {
        return (
            <DynamicTabNavigator />
        );
    }
};

let mapStateToProps = state => ({
    nav: state.nav,
    userInfo: state.userInfo
});

export default connect(mapStateToProps)(HomePage);