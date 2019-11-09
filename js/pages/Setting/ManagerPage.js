import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class ManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    _handleLink(type) {
        NavigationUtil.goPage(null, {
            'user': 'UserManager',
            'match': 'MatchManager',
            'system': 'SystemManager',
            'payment': 'PaymentManager',
            'data': 'DataManager',
            'app': 'AppManager'
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
            title={'管理中心'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ display: 'flex', alignItems: 'center', }}>
                        <TouchableOpacity onPress={() => this._handleLink('user')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_supervisor_account.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>用户管理</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('match')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_assignment.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>球赛管理</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('system')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_date_range.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>系统管理</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('payment')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_chrome_reader_mode.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>收付款管理</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('data')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_assessment.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>数据报告</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('app')} style={{ marginTop: 50, width: 322, height: 60, backgroundColor: '#fff', display: 'flex', justifyContent: 'space-around', alignItems: 'center', borderRadius: 5, }}>
                            <Image source={require('../../static/icon_my_location.png')} />
                            <Text style={{ fontSize: 14, fontWeight: 'bold', }}>APP管理</Text>
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

export default connect(mapStateToProps)(ManagerPage);