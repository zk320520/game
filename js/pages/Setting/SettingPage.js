import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, ImageBackground, Image, Clipboard } from 'react-native';
import { Toast } from '@ant-design/react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { requestApi } from '../../utils/index';
import actions from '../../action/index';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { SafeAreaView } from 'react-navigation';

class SettingPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            Country: '',
            BankName: '',
            BankBranch: '',
            BankAccount: '',
            Name: '',
            Phone: '',
        };
    }

    componentDidMount() {
        requestApi.get('user/getUserInfo', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            console.log(result);
        });
    }

    _handleLink(type) {
        NavigationUtil.goPage(null, {
            'safe': 'Safe',
            'service': 'Service',
            'secret': 'Secret',
            'language': 'Language',
            'version': 'Version',
            'manager': 'Manager'
        }[type]);
    }

    async _handleLoginOut() {
        await AsyncStorage.clear();
        this.props.onLoginOut();
        NavigationUtil.goPage(null, 'Auth');
    }

    _handleCopy() {
        let { IntroCode } = this.props.userInfo;
        Clipboard.setString('http://bp16888.com/signup.html#/?referrer=' + IntroCode);
        Toast.info('复制成功');
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;

        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            style={{ backgroundColor: 'transparent' }}
        />;
        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    <ScrollView>
                        <ImageBackground source={this.props.userInfo.Avatar ? this.props.userInfo.Avatar : require('../../static/bg_user.png')} style={styles.useCard}>
                            <Image style={styles.avatar} source={require('../../static/default_avatar.png')} />
                            <View style={styles.userInfo}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, }}>{this.props.userInfo.Name}</Text>
                                <Text style={{ fontSize: 12, fontWeight: 'bold', }}>注册时间：{this.props.userInfo.CreatedAt}</Text>
                            </View>
                        </ImageBackground>
                        <View style={styles.inviteCode}>
                            <Text style={{ color: '#B88215', fontSize: 16, }}>我的邀请链接</Text>
                            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => this._handleCopy()}>
                                <Image style={{ marginLeft: 20, }} source={require('../../static/icon_copy.png')} />
                                <Text style={{ color: '#B88215', fontSize: 12, marginLeft: 5, }}>复制</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.actions}>
                            <TouchableOpacity onPress={() => this._handleLink('safe')} style={styles.actionItem}>
                                <View style={styles.left}>
                                    <Image source={require('../../static/icon_verified_user.png')} />
                                    <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>安全中心</Text>
                                </View>
                                <View style={styles.right}>
                                    <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._handleLink('service')} style={styles.actionItem}>
                                <View style={styles.left}>
                                    <Image source={require('../../static/icon_receipt.png')} />
                                    <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>服务协议</Text>
                                </View>
                                <View style={styles.right}>
                                    <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._handleLink('secret')} style={styles.actionItem}>
                                <View style={styles.left}>
                                    <Image source={require('../../static/icon_pan_tool.png')} />
                                    <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>隐私政策</Text>
                                </View>
                                <View style={styles.right}>
                                    <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._handleLink('language')} style={styles.actionItem}>
                                <View style={styles.left}>
                                    <Image source={require('../../static/icon_g_translate.png')} />
                                    <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>语言设置</Text>
                                </View>
                                <View style={styles.right}>
                                    <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this._handleLink('version')} style={styles.actionItem}>
                                <View style={styles.left}>
                                    <Image source={require('../../static/icon_extension.png')} />
                                    <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>版本资讯</Text>
                                </View>
                                <View style={styles.right}>
                                    <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                </View>
                            </TouchableOpacity>
                            {
                                this.props.userInfo.Admin ?
                                    <TouchableOpacity onPress={() => this._handleLink('manager')} style={[styles.actionItem, { borderBottomWidth: 0 }]}>
                                        <View style={styles.left}>
                                            <Image source={require('../../static/icon_public.png')} />
                                            <Text style={{ color: '#464646', fontSize: 14, marginLeft: 20, }}>管理中心</Text>
                                        </View>
                                        <View style={styles.right}>
                                            <Image source={require('../../static/icon_arrow_right_sm.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    null
                            }
                        </View>
                        <TouchableOpacity
                            style={styles.registerOutBtn}
                            onPress={() => this._handleLoginOut()}
                        >
                            <Text style={styles.registerText}>登出帐户</Text>
                        </TouchableOpacity>
                    </ScrollView>
                    <View style={styles.kefu}>
                        <View>
                            <Image source={require('../../static/icon_logo.png')} />
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-end', }}>
                            <Text style={{ color: '#fff', fontSize: 16, }}>客服中心：</Text>
                            <Image style={styles.wx} source={require('../../static/icon_wx.png')} />
                            <Image style={styles.wx} source={require('../../static/icon_app.png')} />
                        </View>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

let mapStateToProps = state => ({
    userInfo: state.userInfo,
    gameList: state.gameList,
});

let mapDispatchToProps = dispatch => ({
    onLoginOut: () => dispatch(actions.onLoginOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);

const styles = StyleSheet.create({
    useCard: {
        height: 100,
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 74,
        height: 74,
    },
    userInfo: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 10,
        marginLeft: 20,
    },
    inviteCode: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: 224,
        height: 44,
        paddingLeft: 20,
        marginTop: 10,
        backgroundColor: '#fff',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    actions: {
        marginTop: 20,
    },
    actionItem: {
        height: 44,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: '#f2f2f2',
    },
    left: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    registerOutBtn: {
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 28,
        marginTop: 100,
        borderRadius: 14,
        backgroundColor: '#F5A400',
    },
    registerText: {
        color: '#fff',
        textAlign: 'center',
    },
    kefu: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 10,
        marginRight: 10,
    },
    wx: {
        width: 28,
        height: 28,
    }
});
