import React, { Component } from 'react';
import { View, Text, TouchableOpacity, BackHandler, StyleSheet, Image } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import CusProgressBar from '../../component/CusProgressBar';

class AuthPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            isNext: false
        };
        this.currProgress = 0;
        this.currBuffer = 0;
    }

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this._onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this._onBackPress);
        this.timer && clearInterval(this.timer);
    }

    _onBackPress = () => {
        let { nav } = this.props;
        if (nav.routes[1].index === 0) { // 如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    }

    _handleLink(routeName) {
        NavigationUtil.goPage(null, routeName);
        // this.setState({
        //     isNext: true
        // }, () => {
        //     this.timer = setInterval(() => {
        //         if (this.currProgress >= 1) {
        //             clearInterval(this.timer);
        //             NavigationUtil.goPage(null, routeName);

        //             this.currProgress = 0;
        //             this.currBuffer = 0;
        //             this.setState({
        //                 progress: 0,
        //                 isNext: false
        //             });
        //         } else {
        //             this.currProgress += 0.1;
        //             this.refs.progressBar.progress = this.currProgress;
        //         }
        //     }, 300);
        // });
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            style={{ backgroundColor: 'transparent' }}
        />;
        return (
            <View style={styles.container}>
                <View style={{ flex: 1, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    {navigationBar}
                    <View style={{ marginBottom: 40, display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../static/bg_auth1.png')} />
                    </View>
                    <View style={{ marginBottom: 60, display: 'flex', alignItems: 'center' }}>
                        <Image source={require('../../static/bg_auth2.png')} />
                    </View>
                    {this.state.isNext ? (
                        <View style={{ display: 'flex', height: 100, justifyContent: 'center' }}>
                            <CusProgressBar
                                ref="progressBar"
                                style={styles.progressBar}
                            />
                        </View>
                    ) : (
                            <View style={{ display: 'flex', height: 100, justifyContent: 'center' }}>
                                <TouchableOpacity

                                    style={[styles.button, styles.loginBtn]}
                                    onPress={() => this._handleLink('Login')}
                                >
                                    <Text style={styles.loginText}>会员登入</Text>
                                </TouchableOpacity>
                                <TouchableOpacity

                                    style={[styles.button, styles.registerBtn]}
                                    onPress={() => this._handleLink('Register')}
                                >
                                    <Text style={styles.registerText}>注册会员</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 226,
        height: 35,
        borderRadius: 8,
    },
    loginBtn: {
        marginBottom: 20,
        backgroundColor: '#F5A400',
    },
    registerBtn: {
        backgroundColor: '#FFD481',
    },
    loginText: {
        color: '#fff',
        textAlign: 'center',
    },
    registerText: {
        color: '#333',
        textAlign: 'center',
    },
    progressBar: {
        width: 226,
        overflow: 'hidden',
    }
});

let mapStateToProps = state => ({
    nav: state.nav
});

export default connect(mapStateToProps)(AuthPage);