import React, { Component } from 'react';
import { ScrollView, SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class StoreValuePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            CurrentValue: 500,
            List: [],
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('wallet/getDepositRecord', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            let deespoistRecord = result.deespoistRecord
                                    .filter(item => item.Uid == this.props.userInfo.Uid)
                                    .sort((a, b) => dayjs(b.CreatedAt) - dayjs(a.CreatedAt))
                                    .map(item => {
                                        return {
                                            ...item,
                                            PayStatus: item.Status[Object.keys(item.Status)[Object.keys(item.Status).length - 1]] == 'HASPAYED'
                                        };
                                    });
            this.setState({
                List: deespoistRecord
            });
        });
    }

    _handleLink() {
        NavigationUtil.goPage({ amount: this.state.CurrentValue }, 'MainPay');
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
            title={'帐户储值'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <ScrollView>
                        <View style={{ marginHorizontal: 20, marginVertical: 30, }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ color: '#AC7508', fontSize: 14, fontWeight: 'bold', marginRight: 20, }}>储值方案</Text>
                                <Text style={{ color: '#AC7508', fontSize: 14, fontWeight: 'bold', }}>目前选择方案：${this.state.CurrentValue}</Text>
                            </View>
                            <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between', marginVertical: 20, }}>
                                <TouchableOpacity onPress={() => this.setState({ CurrentValue: 500 })} style={{ marginBottom: 15, }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={this.state.CurrentValue == 500 ? ['#F5A400', '#F5A400'] : ['#F9E897', '#C79B36']} style={{ width: 167, height: 41, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 5, }}>
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>$500</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ CurrentValue: 1000 })} style={{ marginBottom: 15, }}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={this.state.CurrentValue == 1000 ? ['#F5A400', '#F5A400'] : ['#F9E897', '#C79B36']} style={{ width: 167, height: 41, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 5, }}>
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>$1000</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ CurrentValue: 2000 })} style={{}}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={this.state.CurrentValue == 2000 ? ['#F5A400', '#F5A400'] : ['#F9E897', '#C79B36']} style={{ width: 167, height: 41, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 5, }}>
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>$2000</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ CurrentValue: 3000 })} style={{}}>
                                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={this.state.CurrentValue == 3000 ? ['#F5A400', '#F5A400'] : ['#F9E897', '#C79B36']} style={{ width: 167, height: 41, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20, borderRadius: 5, }}>
                                        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', }}>$3000</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this._handleLink()} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 35, backgroundColor: '#F5A400', borderRadius: 5, marginBottom: 20, }}>
                                <Text style={{ color: '#fff', fontSize: 16, }}>确认储值</Text>
                            </TouchableOpacity>
                            {
                                this.state.List.length ?
                                    <View style={{ paddingHorizontal: 10, paddingVertical: 20, backgroundColor: '#fff', borderRadius: 10, }}>
                                        {
                                            this.state.List.map(item => {
                                                return (
                                                    <View style={{ marginBottom: 15 }} key={item.token}>
                                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 15, }}>{item.CreatedAt.split(' ')[0]}</Text>
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 15, }}>{item.CreatedAt.split(' ')[1]}</Text>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                            <View style={{ marginTop: 10, }}>
                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                    <Text style={{ color: '#777', fontSize: 10, marginRight: 50, }}>付款方式：</Text>
                                                                    <Text style={{ color: '#777', fontSize: 10, }}>{item.PaymentType}</Text>
                                                                </View>
                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                    <Text style={{ color: '#777', fontSize: 10, marginRight: 50, }}>订单处理：</Text>
                                                                    <Text style={{ color: '#777', fontSize: 10, }}>{item.PayStatus ? '确认收款' : '等待验证中'}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ display: 'flex', justifyContent: 'space-around', marginRight: 30, paddingLeft: 10, borderLeftColor: '#777', borderLeftWidth: 1, }}>
                                                                <Text style={{ fontSize: 10, }}>方案储值</Text>
                                                                <Text style={{ fontSize: 10, }}>${item.Amonut}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            })
                                        }
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    </ScrollView>
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
});

export default connect(mapStateToProps)(StoreValuePage);