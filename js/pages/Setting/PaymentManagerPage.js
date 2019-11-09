import React, { Component } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class PaymentManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            CurrentIndex: 0,
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('wallet/getDepositRecord', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result1 => {
            requestApi.postJson('admin/getAlluser', {
                Uid: this.props.userInfo.Uid
            }, {
                authorization: this.props.userInfo.token
            }, result2 => {
                Portal.remove(key);
                console.log(result1);
                console.log(result2);
            })
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handlePrev() {
        this.setState({
            CurrentIndex: this.state.CurrentIndex == 0 ? 1 : 0
        });
    }

    _handleNext() {
        this.setState({
            CurrentIndex: this.state.CurrentIndex == 1 ? 0 : 1
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
            title={'收付款管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        const titleList = ['已完成储值订单', '未完成储值订单'];

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ alignSelf: 'center', marginTop: 20, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: 0,
                            height: 0,
                            borderTopWidth: 5,
                            borderTopColor: 'transparent',
                            borderRightWidth: 10,
                            borderRightColor: '#000',
                            borderBottomWidth: 5,
                            borderBottomColor: 'transparent',
                        }}
                            onPress={() => this._handlePrev()} />
                        <Text style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20, }}>{titleList[this.state.CurrentIndex]}</Text>
                        <TouchableOpacity style={{
                            marginTop: 5,
                            width: 0,
                            height: 0,
                            borderTopWidth: 5,
                            borderTopColor: 'transparent',
                            borderLeftWidth: 10,
                            borderLeftColor: '#000',
                            borderBottomWidth: 5,
                            borderBottomColor: 'transparent',
                        }}
                            onPress={() => this._handleNext()} />
                    </View>
                    <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#fff', marginTop: 20, }}>
                        <Text style={{ fontSize: 15, marginLeft: 50 }}>台湾已入金点数</Text>
                        <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>100000</Text>
                    </View>
                    <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                        <Text style={{ fontSize: 15, marginLeft: 50 }}>中国已入金点数</Text>
                        <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>100000</Text>
                    </View>
                    <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                        <Text style={{ fontSize: 15, marginLeft: 50 }}>海外已入金点数</Text>
                        <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>100000</Text>
                    </View>

                    <View style={{ width: 357, alignSelf: 'center', marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 75, height: 29, backgroundColor: '#fff', borderRadius: 5, }}>
                            <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>手机号码</Text>
                        </View>
                        <View style={{ width: 213, height: 29, backgroundColor: '#fff', borderRadius: 5, }}>
                            <TextInput style={{ width: 213, height: 29, paddingHorizontal: 20, paddingVertical: 5, }} placeholder={'输入关键字'} onChangeText={text => this.setState({ Phone: text })} />
                        </View>
                        <TouchableOpacity onPress={() => this._handleSearch()} style={{ width: 32, height: 29, borderRadius: 5, backgroundColor: '#AC7508', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>确认</Text>
                        </TouchableOpacity>
                    </View>
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

export default connect(mapStateToProps)(PaymentManagerPage);
