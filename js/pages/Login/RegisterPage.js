import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux';
import { Toast } from '@ant-design/react-native';
import RNPickerSelect from 'react-native-picker-select';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from '../../component/NavigationBar';
import actions from '../../action/index';

const CountryCodeList = [
    { value: "886", key: "886", label: "台灣" },
    { value: "86", key: "86", label: "中国" },
    { value: "852", key: "852", label: "香港" },
    { value: "81", key: "81", label: "にっぽん" },
    { value: "65", key: "65", label: "Singapore" },
    { value: "60", key: "60", label: "Malaysia" },
    { value: "62", key: "62", label: "Indonesia" },
    { value: "91", key: "91", label: "India" },
    { value: "84", key: "84", label: "ViệtNam" },
    { value: "855", key: "855", label: "Kambodia" },
    { value: "82", key: "82", label: "한국" },
    { value: "66", key: "66", label: "ประเทศไทย" }
];

class RegisterPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            Referrer: '',
            Email: '',
            Password: '',
            ConfirmPwd: '',
            Name: '',
            CountryCode: '',
            Phone: ''
        };
    }

    // 点击登录，本地持久化保存用户token，并跳转到首页
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('Home');
    };

    _changeUserInfo(text, type) {
        this.setState({ [`${type}`]: text });
    }

    _handleRegister() {
        if (!this.state.Referrer) {
            Toast.offline('推荐人代码不能为空');
            return false;
        } else if (!this.state.Email) {
            Toast.offline('登入帐号不能为空');
            return false;
        } else if (!this.state.Password) {
            Toast.offline('登入密码不能为空');
            return false;
        } else if (!this.state.ConfirmPwd) {
            Toast.offline('确认密码不能为空');
            return false;
        } else if (this.state.Password != this.state.ConfirmPwd) {
            Toast.offline('登入密码与确认密码不一致');
            return false;
        } else if (!this.state.Name) {
            Toast.offline('真实姓名不能为空');
            return false;
        } else if (!this.state.CountryCode) {
            Toast.offline('国码不能为空');
            return false;
        } else if (!this.state.Phone) {
            Toast.offline('联络电话不能为空');
            return false;
        }

        let { onRegisterTemp, navigation } = this.props;

        onRegisterTemp({ ...this.state });

        navigation.navigate('Confirm');
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
            <ImageBackground style={{ flex: 1, backgroundColor: '#000' }} source={require('../../static/bg_register.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={styles.container}>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} value={this.state.Referrer} onChangeText={text => { this._changeUserInfo(text, 'Referrer'); }} placeholder={'推荐人代码'} placeholderTextColor={'#FFD481'} />
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} keyboardType={'email-address'} value={this.state.Email} onChangeText={text => { this._changeUserInfo(text, 'Email'); }} placeholder={'登入帐号（常用电子邮箱）'} placeholderTextColor={'#FFD481'} keyboardType={'email-address'} />
                            <Text style={{ color: '#FC5F5F', fontSize: 8, marginTop: 5, }}>注意：请确认此邮箱能正确收取信件，避免您密码遗失无法找回</Text>
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} value={this.state.Password} onChangeText={text => { this._changeUserInfo(text, 'Password'); }} placeholder={'登入密码'} placeholderTextColor={'#FFD481'} secureTextEntry={true} />
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} value={this.state.ConfirmPwd} onChangeText={text => { this._changeUserInfo(text, 'ConfirmPwd'); }} placeholder={'确认密码'} placeholderTextColor={'#FFD481'} secureTextEntry={true} />
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} value={this.state.Name} onChangeText={text => { this._changeUserInfo(text, 'Name'); }} placeholder={'真实姓名'} placeholderTextColor={'#FFD481'} />
                        </View>
                        <View style={styles.inputWraper}>
                            <RNPickerSelect
                                style={{ ...pickerStyle, }}
                                placeholderTextColor={'#FFD481'}
                                placeholder={{ label: '选择国码', value: '选择国码', key: '选择国码' }}
                                onValueChange={value => {
                                    this.setState({
                                        CountryCode: value,
                                    });
                                }}
                                items={CountryCodeList}
                                Icon={() => {
                                    return <Image source={require('../../static/icon_arrow_down.png')} />
                                }}
                            />
                        </View>
                        <View style={styles.inputWraper}>
                            <TextInput autoCapitalize={'none'} style={styles.input} value={this.state.Phone} onChangeText={text => { this._changeUserInfo(text, 'Phone'); }} placeholder={'联络电话'} placeholderTextColor={'#FFD481'} />
                        </View>
                        <Text style={styles.tip}>确认资料无误，再点击注册</Text>
                        <TouchableOpacity
                            style={styles.register}
                            onPress={() => this._handleRegister()}
                        >
                            <Text style={styles.registerText}>确认注册</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground >
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    onRegisterTemp: tempInfo => dispatch(actions.onRegisterTemp(tempInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWraper: {
        width: 290,
        marginBottom: 30,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD481',
    },
    input: {
        color: '#FFD481',
    },
    tip: {
        marginTop: 60,
        color: '#FFD481',
        fontSize: 12,
    },
    register: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 28,
        marginTop: 20,
        borderRadius: 28,
        backgroundColor: '#F5A400',
    },
    registerText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    }
});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        color: '#FFD481',
    },
    inputAndroid: {
        color: '#FFD481',
    },
});