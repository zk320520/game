import React, { Component } from 'react';
import { Image, Text, View, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationBar from '../../component/NavigationBar';
import { requestApi } from '../../utils/index';
import actions from '../../action/index';

class AuthLoading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._bootstrapAsync();
    }
    componentWillUnmount() {
        this.timeOut && clearTimeout(this.timeOut);
    }

    async _bootstrapAsync() {
        let [userInfo, userToken] = await Promise.all([
            AsyncStorage.getItem('userInfo'),
            AsyncStorage.getItem('userToken')
        ]);
        if (userInfo && userToken) {
            userInfo = JSON.parse(userInfo);
            this._handleLogin(userInfo);
        } else {
            this.timeOut = setTimeout(() => {
                this.props.navigation.navigate('Auth');
            }, 5000);
        }
    }

    _handleLogin(userInfo) {
        requestApi.postJson('user/login', { Email: userInfo.Email, Password: userInfo.Password }, {}, async (result) => {
            let userToken = result.token;
            await AsyncStorage.setItem('userToken', userToken)
         
            this.props.onLoginSuccess(result);
            this.props.navigation.navigate('AppStack');
        }, () => {
            this.props.navigation.navigate('Auth');
        });
    }

    render() {
        let navigationBar = <NavigationBar
            style={{ backgroundColor: 'transparent' }}
        />;
        return (
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} source={require('../../static/bg_start.png')}>
                {navigationBar}
                <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: Dimensions.get('window').height - 150 }}>
                    <Image source={require('../../static/bp3.png')} />
                    <Text style={{ fontSize: 25 }}>运动赛事</Text>
                    <Image source={require('../../static/basketball.png')} />
                    <Image source={require('../../static/baseball.png')} />
                </View>
            </ImageBackground>
             
        );
    }
}

const mapStateToProps = state => ({
    nav: state.nav,
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    onLoginSuccess: userInfo => dispatch(actions.onLoginSuccess(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
