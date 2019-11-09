import React, { Component } from 'react';
import { View, Text, ScrollView, SafeAreaView, ImageBackground, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Tabs, Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class WithdrawPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            WalletAmount: 0,
            Amount: '',
            TLList: []
        };
    }

    componentDidMount() {
        requestApi.get('wallet/getDepositRecord', {
            Uid: this.props.userInfo.Uid,
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            if (this.props.userInfo.Admin) {
                result.wallet = result.wallet.find(item => item.Uid == this.props.userInfo.Uid);
            }
            this.setState({
                WalletAmount: Math.round(result.wallet.WalletAmount),
            });
        });

        requestApi.get('wallet/getWithdrawRecord', {
            Uid: this.props.userInfo.Uid,
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            console.log(result);
            this.setState({
                TLList: result.filter(item => item.Uid == this.props.userInfo.Uid)
            });
        });

        requestApi.get('waller/getBouns', {
            Uid: this.props.userInfo.Uid,
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            console.log(result);
        });
    }

    _handleWithdraw() {
        let key = Toast.loading('提领中', 0);
        requestApi.postJson('wallet/withdraw', {
            Uid: this.props.userInfo.Uid,
            Amount: this.state.Amount
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            console.log(result);
        });
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
            style={{ backgroundColor: 'transparent' }}
        />;
        let tabs = [
            { title: '投注收益' },
            { title: '直推奖金' },
            { title: '代理奖金' },
            { title: '提领记录' },
        ];
        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <ScrollView>
                        <View style={{ marginTop: 20, height: 70, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 193, height: 56, backgroundColor: '#F5A400', borderTopRightRadius: 28, borderBottomRightRadius: 28 }}>
                                <Text style={{ color: '#fff', fontSize: 18, }}>帐户总额：{this.state.WalletAmount}</Text>
                            </View>
                            <View style={{ marginRight: 20, height: 70, display: 'flex', justifyContent: 'space-around', }}>
                                <View style={{ width: 144, height: 28, paddingHorizontal: 5, borderRadius: 5, backgroundColor: '#fff', display: 'flex', justifyContent: 'center', }}>
                                    <TextInput placeholder={'输入提领点数'} autoCapitalize={'none'} value={this.state.Amount} onChangeText={text => this.setState({ Amount: text })} />
                                </View>
                                <TouchableOpacity onPress={() => this._handleWithdraw()} style={{ width: 144, height: 28, borderRadius: 5, backgroundColor: '#F5A400', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ color: '#fff', fontSize: 14 }}>确认提领</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'center', marginVertical: 30 }}>
                            <View style={{ width: 300, height: 0, borderTopColor: '#F5A400', borderTopWidth: 1 }}></View>
                        </View>
                        <View style={{ display: 'flex', alignItems: 'center' }}>
                            <Text style={{ color: '#AC7508', fontSize: 18, }}>奖金记录</Text>
                        </View>
                        <View style={{ flex: 1, marginTop: 20, }}>
                            <Tabs
                                tabs={tabs}
                                swipeable={false}
                                tabBarTextStyle={{ fontSize: 12, fontWeight: 'bold', }}
                                tabBarUnderlineStyle={{ height: 1, backgroundColor: '#707070', }}
                                tabBarBackgroundColor={'transparent'}
                            >
                                <View style={{ padding: 20, marginTop: 20, alignSelf: 'center', width: Dimensions.get('window').width - 20, backgroundColor: '#fff', borderRadius: 5, }}>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 50 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 50 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 50 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ padding: 20, marginTop: 20, alignSelf: 'center', width: Dimensions.get('window').width - 20, backgroundColor: '#fff', borderRadius: 5, }}>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ padding: 20, marginTop: 20, alignSelf: 'center', width: Dimensions.get('window').width - 20, backgroundColor: '#fff', borderRadius: 5, }}>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 10, }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{}}>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>2019.05.12</Text>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>23:45</Text>
                                        </View>
                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 20 }}>记录详情：</Text>
                                                <Text style={{ color: '#777', fontSize: 10, }}>直推用户「林大户」投注赛事胜出</Text>
                                            </View>
                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, }}>
                                                <Text style={{ fontSize: 12, }}>金额：$1000</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ padding: 20, marginTop: 20, alignSelf: 'center', width: Dimensions.get('window').width - 20, backgroundColor: '#fff', borderRadius: 5, }}>
                                    {
                                        this.state.TLList.length ?
                                            this.state.TLList.map(item => {
                                                return (
                                                    <View key={item.docId} style={{ marginBottom: 10, }}>
                                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>{item.CreatedAt.split(' ')[0]}</Text>
                                                            <Text style={{ fontSize: 12, fontWeight: 'bold', }}>{item.CreatedAt.split(' ')[1]}</Text>
                                                        </View>
                                                        <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', }}>
                                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', flex: 3, }}>
                                                                <Text style={{ color: '#777', fontSize: 10, marginRight: 50 }}>提领状态：</Text>
                                                                <Text style={{ color: '#777', fontSize: 10, }}>{item.Remark}</Text>
                                                            </View>
                                                            <View style={{ height: 25, display: 'flex', flexDirection: 'row', alignItems: 'center', borderLeftColor: '#777', borderLeftWidth: 1, paddingLeft: 10, flex: 1, }}>
                                                                <Text style={{ fontSize: 12, }}>点数：${item.Amonut}</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                );
                                            })
                                            :
                                            <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>暂无提领记录</Text>
                                    }
                                </View>
                            </Tabs>
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

export default connect(mapStateToProps)(WithdrawPage);