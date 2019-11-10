import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { Modal, Toast, Portal } from '@ant-design/react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from '../../component/NavigationBar';
import { requestApi } from '../../utils/index';
import actions from '../../action/index';

let cutDown = null;
class LoginPage extends Component {
    static navigationOptions = {
        header: null
    };
    
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
            ForgetPwd: false,
            Phone: '',
            Code: '',
            LastTime: 60,
            SendCode: false,
            SendCodeStatus: false,
            Reset: false
        };
    }

    _handleSendEmail() {
        this.setState({
            ForgetPwd: true
        });
    }

    _changeAccount(Email) {
        this.setState({ Email })
    }

    _changePwd(Password) {
        this.setState({ Password })
    }

    _handleLogin() {
        if (!this.state.Email) {
            Toast.offline('帐号不能为空');
            return false;
        } else if (!this.state.Password) {
            Toast.offline('密码不能为空');
            return false;
        }

        let key = Toast.loading('登录中', 0);
        requestApi.postJson('user/login', { Email: this.state.Email, Password: this.state.Password }, {}, async (result) => {
            let userInfo = JSON.stringify({ Email: this.state.Email, Password: this.state.Password });
            let userToken = result.token;
            await Promise.all([
                AsyncStorage.setItem('userInfo', userInfo),
                AsyncStorage.setItem('userToken', userToken)
            ]);

            let { onLoginSuccess } = this.props;
            onLoginSuccess(result);

            Portal.remove(key);
            this.props.navigation.navigate('AppStack');
        }, () => {
            Portal.remove(key);
        });
    }

    _sendCode() {
        if (!this.state.Phone) return Toast.offline('手机号不能为空');

        requestApi.postJson('user/sendSMS', {
            Phone: this.state.Phone
        }, {}, result => {
            cutDown = setInterval(() => {
                if (this.state.LastTime <= 1) {
                    this.setState((prevState) => ({
                        LastTime: 60
                    }));
                    clearInterval(cutDown);
                } else {
                    this.setState((prevState) => ({
                        LastTime: prevState.LastTime - 1
                    }));
                }
            }, 1000);
        });
    }

    _handleConfirm() {

        // if (!this.state.Phone) return Toast.offline('手机号不能为空');
        // else if (!this.state.Code) return Toast.offline('验证码不能为空');

        // requestApi.postJson('user/forgetPassword', {
        //     Phone: this.state.Phone,
        //     Code: this.state.Code
        // }, {}, result => {

        // }, () => {
        //     Toast.offline('验证码不正确');
        // });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
        let navigationBar = <NavigationBar
            leftButton={
                <TouchableOpacity
                    style={{ width: 60, height: 24, marginLeft: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => this._onBack()}
                >
                    <Image source={require('../../static/icon_arrow_back.png')} />
                    <Text style={{ marginLeft: 6, color: '#AC7508', fontSize: 12, }}>返回</Text>
                </TouchableOpacity>
            }
            title={''}
            style={{ backgroundColor: 'transparent' }}
        />;
        return (
            <ImageBackground style={{ flex: 1, backgroundColor: '#000' }} source={require('../../static/bg_login.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={styles.container}>
                        <View style={styles.inputWraper}>
                            <TextInput keyboardType={'email-address'} autoCapitalize={'none'} value={this.state.Email} style={styles.input} placeholder={'登入帐号'} placeholderTextColor={'#FFD481'} onChangeText={text => { this._changeAccount(text); }} />
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} value={this.state.Password} style={styles.input} placeholder={'登入密码'} placeholderTextColor={'#FFD481'} secureTextEntry={true} onChangeText={text => { this._changePwd(text); }} />
                            <TouchableOpacity
                                style={styles.tip}
                                onPress={() => this._handleSendEmail()}
                            >
                                <Text style={styles.text}>忘记密码?</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.login}
                            onPress={() => this._handleLogin()}
                        >
                            <Text style={styles.loginText}>登入</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.ForgetPwd}
                        onClose={() => this.setState({ ForgetPwd: false })}
                        style={{ width: 336, height: 223, borderRadius: 5, backgroundColor: '#fff', }}
                    >
                        <View style={{}}>
                            <View style={{ marginBottom: 15, }}>
                                <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', }}>密码找回</Text>
                            </View>
                            <View style={{ width: 295, height: 32, marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: 174, height: 20, paddingHorizontal: 5, paddingVertical: 2, }}>
                                    <TextInput keyboardType={'numeric'} placeholder={'请输入注册时的手机号码'} autoCapitalize={'none'} value={this.state.Phone} style={{}} onChangeText={text => this.setState({ Phone: text })} />
                                </View>
                                {
                                    this.state.LastTime == 60 ?
                                        <TouchableOpacity style={{ width: 110, height: 21, paddingHorizontal: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', borderWidth: 2, borderColor: '#AC7508', borderRadius: 10.5 }} onPress={() => this._sendCode()}>
                                            <Text style={{ color: '#AC7508', fontSize: 12, fontWeight: 'bold', }}>发送验证码</Text>
                                            <Image source={require('../../static/icon_rounded.png')} />
                                        </TouchableOpacity>
                                        :
                                        <Text style={{ width: 110, height: 21, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#AC7508', borderRadius: 10.5, color: '#AC7508', fontSize: 12, fontWeight: 'bold', }}>{this.state.LastTime}秒后重新发送</Text>
                                }

                            </View>
                            <View style={{ width: 132, height: 32, marginTop: 15, }}>
                                <TextInput keyboardType={'numeric'} placeholder={'输入验证码'} autoCapitalize={'none'} value={this.state.Code} style={{ marginHorizontal: 2, marginVertical: 5, fontSize: 14, }} onChangeText={text => this.setState({ Code: text })} />
                            </View>
                            <View style={{ marginTop: 20, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: 108, height: 27, backgroundColor: '#AC7508', borderRadius: 5, }}>
                                <TouchableOpacity style={{}} onPress={() => this._handleConfirm()}>
                                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>进行重置密码</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.SendCode}
                        onClose={() => this.setState({ SendCode: false })}
                        style={{ width: 329, height: 329, borderRadius: 5, backgroundColor: '#fff', }}
                    >
                        {
                            this.state.SendCodeStatus ?
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_check_circle.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#229A0D', fontSize: 30, }}>成功发送</Text>
                                        <Text style={{ color: '#229A0D', fontSize: 30, }}>手机验证码</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_warning_sign.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>发送失败</Text>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>查无此帐号用户</Text>
                                    </View>
                                </View>
                        }
                    </Modal>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.Reset}
                        onClose={() => this.setState({ Reset: false })}
                        style={{ width: 329, height: 329, borderRadius: 5, backgroundColor: '#fff', }}
                    >
                        <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                            <Image source={require('../../static/icon_check_circle.png')} />
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: '#229A0D', fontSize: 30, }}>成功重置密码</Text>
                                <Text style={{ color: '#229A0D', fontSize: 20, }}>临时登入密码为000000</Text>
                                <Text style={{ color: '#229A0D', fontSize: 20, }}>登入成功请至设定更改密码</Text>
                            </View>
                        </View>
                    </Modal>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    onLoginSuccess: userInfo => dispatch(actions.onLoginSuccess(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWraper: {
        width: 290,
        marginBottom: 30,
    },
    tip: {
        marginTop: 15,
        alignSelf: 'flex-end',
    },
    input: {
        paddingTop: 10,
        paddingBottom: 10,
        color: '#FFD481',
        borderBottomWidth: 1,
        borderBottomColor: '#FFD481',
    },
    text: {
        color: '#F5A400',
        fontSize: 12,
    },
    login: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 28,
        marginTop: 150,
        borderRadius: 28,
        backgroundColor: '#F5A400',
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
});