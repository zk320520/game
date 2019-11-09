import React, { Component } from 'react';
import { SafeAreaView, View, Text, ScrollView, ImageBackground, Image, TouchableOpacity, Switch } from 'react-native';
import { Toast, Portal, } from '@ant-design/react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class AppManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            Game: false,
            News: false,
            Shop: false,
            Video: false,
            Wallet: false
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('system/getPage', null, null, result => {
            Portal.remove(key);
            this.setState({
                ...result
            });
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handleOpen(type) {
        this.setState({
            [type]: !this.state[type]
        });
    }

    render() {
        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            leftButton={
                <TouchableOpacity
                    style={{ width: 60, height: 24, marginLeft: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => this._onBack()}
                >
                    <Image source={require('../../static/icon_arrow_back.png')} />
                    <Text style={{ marginLeft: 6, color: '#AC7508', fontSize: 12, }}>返回</Text>
                </TouchableOpacity>
            }
            title={'APP管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1 }}>
                    {navigationBar}
                    <ScrollView style={{ flex: 1, }}>
                        <View style={{ alignSelf: 'center', marginTop: 20 }}>
                            <Text style={{ color: '#795309', fontSize: 14, fontWeight: 'bold' }}>管理用户的使用功能</Text>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>系统钱包</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    value={this.state.Wallet}
                                    onValueChange={() => this._handleOpen('Wallet')}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>即时新闻</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    value={this.state.News}
                                    onValueChange={() => this._handleOpen('News')}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>影视影片</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    value={this.state.Video}
                                    onValueChange={() => this._handleOpen('Video')}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>APP游戏</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    value={this.state.Game}
                                    onValueChange={() => this._handleOpen('Game')}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>品牌商城</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    value={this.state.Shop}
                                    onValueChange={() => this._handleOpen('Shop')}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>公告</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 75, marginRight: 20, }}
                                    onValueChange={() => this._handleOpen()}
                                />
                            </View>
                            <View style={{ width: 322, height: 60, backgroundColor: '#fff', borderRadius: 5, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ fontSize: 14, fontWeight: 'bold' }}>活动布告栏</Text>
                                <Switch
                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }], marginLeft: 60, marginRight: 20, }}
                                    onValueChange={() => this._handleOpen()}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

let mapStateToProps = state => ({
    userInfo: state.userInfo
});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(AppManagerPage);
