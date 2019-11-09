import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class FinancialPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    _handleLink(type) {
        NavigationUtil.goPage(null, { 'store': 'FinancialStoreValue', 'withdraw': 'FinancialWithdraw' }[type]);
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                {navigationBar}
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
                    <ScrollView>
                        <View style={{ width: 300, marginTop: 30, marginBottom: 30, height: 51, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                            <Image style={{ width: 139, height: 51, }} source={require('../../static/logo.png')} />
                            <View>
                                <Image style={{ width: 30, height: 19, alignSelf: 'flex-end' }} source={require('../../static/icon_group.png')} />
                                <Text style={{ fontSize: 20, }}>帐务经理</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginBottom: 50, }} onPress={() => this._handleLink('store')}>
                            <View style={{ display: 'flex', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 300, height: 174, backgroundColor: '#FFFBE0', borderRadius: 20, }}>
                                <View style={{}}>
                                    <Image style={{ width: 119, height: 159 }} source={require('../../static/bp4.png')} />
                                </View>
                                <View style={{ height: 159, display: 'flex', justifyContent: 'space-around', }}>
                                    <Image style={{ width: 80, height: 47 }} source={require('../../static/bp6.png')} />
                                    <Text style={{ color: '#A88503', fontSize: 30, }}>帐号储值</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink('withdraw')}>
                            <View style={{ display: 'flex', padding: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 300, height: 174, backgroundColor: '#FFBB31', borderRadius: 20, }}>
                                <View style={{}}>
                                    <Image style={{ width: 119, height: 159 }} source={require('../../static/bp5.png')} />
                                </View>
                                <View style={{ height: 159, display: 'flex', justifyContent: 'space-around', }}>
                                    <Image style={{ width: 80, height: 47 }} source={require('../../static/bp7.png')} />
                                    <Text style={{ color: '#fff', fontSize: 30, }}>帐号提取</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </ImageBackground >
        );
    }
};

let mapStateToProps = state => ({});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(FinancialPage);