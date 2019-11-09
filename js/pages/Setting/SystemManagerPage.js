import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class SystemManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    _handleLink(type) {
        NavigationUtil.goPage(null, {
            'secret': 'SecretManager',
            'service': 'ServiceManager',
            'level': 'LevelManager',
            'exchange': 'ExchangeManager',
            'news': 'NewsManager'
        }[type]);
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;

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
            title={'系统管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground source={require('../../static/bg.png')} style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ marginTop: 20, }}>
                        <TouchableOpacity onPress={() => this._handleLink('secret')} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 44, backgroundColor: '#fff', borderBottomColor: '#F2F2F2', borderBottomWidth: 1, }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, }}>隐私政策管理</Text>
                            <Image source={require('../../static/icon_arrow_right_sm.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('service')} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 44, backgroundColor: '#fff', borderBottomColor: '#F2F2F2', borderBottomWidth: 1, }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, }}>服务协议管理</Text>
                            <Image source={require('../../static/icon_arrow_right_sm.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('exchange')} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 44, backgroundColor: '#fff', }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, }}>即时汇率管理</Text>
                            <Image source={require('../../static/icon_arrow_right_sm.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('news')} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 44, backgroundColor: '#fff', }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', marginLeft: 20, }}>广告资讯管理</Text>
                            <Image source={require('../../static/icon_arrow_right_sm.png')} />
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

let mapStateToProps = state => ({});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(SystemManagerPage);