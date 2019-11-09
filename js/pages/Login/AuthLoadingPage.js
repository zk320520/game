import React, { Component } from 'react';
import { Image, Text, View, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { requestApi } from '../../utils/index';
import actions from '../../action/index';

class AuthLoading extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // this.props.navigation.navigate('Home');
        this._bootstrapAsync();
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
            this.props.navigation.navigate('Auth');
        }
    }

    _handleLogin(userInfo) {
        requestApi.postJson('user/login', { Email: userInfo.Email, Password: userInfo.Password }, {}, async (result) => {
            let userToken = result.token;
            await AsyncStorage.setItem('userToken', userToken)
         
            this.props.onLoginSuccess(result);
            this.props.navigation.navigate('Home');
        }, () => {
            this.props.navigation.navigate('Auth');
        });
    }

    render() {
        return (
            <ImageBackground style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }} source={require('../../static/bg_start.png')}>
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
