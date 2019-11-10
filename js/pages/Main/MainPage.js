import React, { Component } from 'react';
import { ScrollView, SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, Dimensions, } from 'react-native';
import { Tabs, Toast, Portal } from '@ant-design/react-native';
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import { requestApi } from '../../utils/index';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import actions from '../../action/index';

class MainPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            MarqueeList: [],
            AdList: [],
            WalletAmount: 0,
            TotalReturnBouns: 0,
            CurrentLevelName: '',
            CurrentIndex: 0,
            GameList: []
        };
    }

    componentDidMount() {
        this._getMarquee();
        this._getAvailableBetGame();
        // this._getAd();
        this._getDepositRecord();
        this._getPlan();
    }

    _getMarquee() {
        requestApi.get('system/getMarquee', null, null, async (result) => {
            let marqueeList = result.filter(item => {
                return item.Active;
            }).sort((prev, curr) => {
                return new Date(curr.CreatedAt) - new Date(prev.CreatedAt);
            }).map((item, index) => {
                return {
                    label: index + 1,
                    value: item.Content
                };
            });
            this.setState({
                MarqueeList: marqueeList
            });
        });
    }

    _getAvailableBetGame() {
        requestApi.get('wallet/getAvailableBetGame', { Uid: this.props.userInfo.Uid, date: dayjs().format('YYYY-MM-DD') }, { authorization: this.props.userInfo.token }, result => {
            this.setState({
                GameList: result
            }, () => {
                console.log(result);
                this.props.onGameListSuccess(result);
            });
        });
    }

    _getAd() {
        requestApi.get('system/getAd', null, null, async (result) => {
            let adList = result.filter(item => {
                return item.Active;
            }).sort((prev, curr) => {
                return new Date(curr.CreatedAt) - new Date(prev.CreatedAt);
            }).map(item => {
                return {
                    uri: `https://blackpanther.timesapi.com:8443/${item.Image}`
                };
            });
            this.setState({
                AdList: adList
            });
        });
    }

    _getDepositRecord() {
        requestApi.get('wallet/getDepositRecord', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            if (this.props.userInfo.Admin) {
                result.wallet = result.wallet.find(item => item.Uid == this.props.userInfo.Uid);
            }
            this.setState({
                WalletAmount: Math.round(result.wallet.WalletAmount),
                TotalReturnBouns: Math.round(result.wallet.TotalReturnBouns)
            });
        });
    }

    _getPlan() {
        requestApi.get('plan/getPlan', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            let levelList = ['实习分析师', '一星分析师', '二星分析师', '三星分析师', '四星分析师', '五星分析师', '黄金分析师', '铂金分析师', '钻石分析师', '点数商'];
            this.setState({
                CurrentLevelName: levelList[result.CurrentLevel]
            });
        });
    }

    _handlePrev() {
        let key = Toast.loading('加载中', 0);
        this.setState({
            CurrentIndex: this.state.CurrentIndex == 0 ? 2 : this.state.CurrentIndex - 1
        }, () => {
            Portal.remove(key);
        });
    }

    _handleNext() {
        let key = Toast.loading('加载中', 0);
        this.setState({
            CurrentIndex: this.state.CurrentIndex == 2 ? 0 : this.state.CurrentIndex + 1
        }, () => {
            Portal.remove(key);
        });
    }

    render() {
        let matchNameList = ['棒球赛事', '篮球赛事', '足球赛事'];

        let tabs = [
            { title: '台湾职棒' },
            { title: '美国职棒' },
            { title: '日本职棒' },
            { title: '韩国职棒' },
            { title: '澳洲职棒' }
        ];

        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            style={{ backgroundColor: 'transparent' }}
        />;
        NavigationUtil.navigation = this.props.navigation;

        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={styles.header}>
                            <View style={styles.logo}><Image source={require('../../static/logo.png')} /></View>
                            <View style={styles.match}>
                                <TouchableOpacity style={styles.triangleLeft}
                                    onPress={() => this._handlePrev()} />
                                <Text style={styles.matchName}>{matchNameList[this.state.CurrentIndex]}</Text>
                                <TouchableOpacity style={styles.triangleRight}
                                    onPress={() => this._handleNext()} />
                            </View>
                        </View>
                        <View style={{ marginTop: 15, width: Dimensions.get('window').width }}>
                            <MarqueeHorizontal
                                textList={this.state.MarqueeList}
                                speed={60}
                                width={Dimensions.get('window').width}
                                height={12}
                                direction={'left'}
                                reverse={false}
                                bgContainerStyle={{ backgroundColor: 'transparent' }}
                                textStyle={{ fontSize: 8, color: '#DB0000' }}
                            />
                        </View>
                        <View style={styles.tabs}>
                            {
                                this.state.CurrentIndex == 0 ?
                                    <Tabs
                                        tabs={tabs}
                                        swipeable={false}
                                        tabBarTextStyle={styles.tabBarTextStyle}
                                        tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                        tabBarBackgroundColor={'transparent'}
                                    >
                                        <ScrollView horizontal={true} style={styles.tabContent}>
                                            {
                                                this.state.GameList.filter(item => item.leagueID == 'tw_13').length ?
                                                    this.state.GameList.filter(item => item.leagueID == 'tw_13').map(item => {
                                                        return (
                                                            <View style={styles.matchContent} key={item.gameID}>
                                                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                                                        <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Image source={require('../../static/icon_arrow_left.png')} style={{ marginRight: 15 }} />
                                                                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', }}>VS</Text>
                                                                            <Image source={require('../../static/icon_arrow_right.png')} style={{ marginLeft: 15 }} />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_brothers_sub.png')} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginLeft: 30, marginRight: 30, flex: 1, }} >
                                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.homeName}</Text>
                                                                            <Text style={{ marginTop: 4, marginLeft: 10, color: '#AFAAA9', fontSize: 7, }}>主场队伍</Text>
                                                                        </View>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ marginTop: 4, marginRight: 10, color: '#AFAAA9', fontSize: 7, }}>客场队伍</Text>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.awayName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.homeScore}</Text>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.awayScore}</Text>
                                                                    </View>
                                                                    <View style={{ alignSelf: 'center' }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.status == '未開賽' ? '开放预测赛事' : item.status == '比賽中' ? '正在进行赛事' : '最终结果'}</Text>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </ScrollView>
                                        <ScrollView horizontal={true} style={styles.tabContent}>
                                            {
                                                this.state.GameList.filter(item => item.leagueID == 'bb_1' || item.leagueID == 'bb_5' || item.leagueID == 'bb_4').length ?
                                                    this.state.GameList.filter(item => item.leagueID == 'bb_1' || item.leagueID == 'bb_5' || item.leagueID == 'bb_4').map(item => {
                                                        return (
                                                            <View style={styles.matchContent} key={item.gameID}>
                                                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                                                        <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Image source={require('../../static/icon_arrow_left.png')} style={{ marginRight: 15 }} />
                                                                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', }}>VS</Text>
                                                                            <Image source={require('../../static/icon_arrow_right.png')} style={{ marginLeft: 15 }} />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_brothers_sub.png')} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginLeft: 30, marginRight: 30, flex: 1, }} >
                                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.homeName}</Text>
                                                                            <Text style={{ marginTop: 4, marginLeft: 10, color: '#AFAAA9', fontSize: 7, }}>主场队伍</Text>
                                                                        </View>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ marginTop: 4, marginRight: 10, color: '#AFAAA9', fontSize: 7, }}>客场队伍</Text>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.awayName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.homeScore}</Text>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.awayScore}</Text>
                                                                    </View>
                                                                    <View style={{ alignSelf: 'center' }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.status == '未開賽' ? '开放预测赛事' : item.status == '比賽中' ? '正在进行赛事' : '最终结果'}</Text>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </ScrollView>
                                        <ScrollView horizontal={true} style={styles.tabContent}>
                                            {
                                                this.state.GameList.filter(item => item.leagueID == 'bb_2' || item.leagueID == 'bb_10').length ?
                                                    this.state.GameList.filter(item => item.leagueID == 'bb_2' || item.leagueID == 'bb_10').map(item => {
                                                        return (
                                                            <View style={styles.matchContent} key={item.gameID}>
                                                                <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                                                        <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                            <Image source={require('../../static/icon_arrow_left.png')} style={{ marginRight: 15 }} />
                                                                            <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', }}>VS</Text>
                                                                            <Image source={require('../../static/icon_arrow_right.png')} style={{ marginLeft: 15 }} />
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                        <Image source={require('../../static/icon_brothers_sub.png')} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginLeft: 30, marginRight: 30, flex: 1, }} >
                                                                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.homeName}</Text>
                                                                            <Text style={{ marginTop: 4, marginLeft: 10, color: '#AFAAA9', fontSize: 7, }}>主场队伍</Text>
                                                                        </View>
                                                                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                            <Text style={{ marginTop: 4, marginRight: 10, color: '#AFAAA9', fontSize: 7, }}>客场队伍</Text>
                                                                            <Text style={{ color: '#fff', fontSize: 11, }}>{item.awayName}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.homeScore}</Text>
                                                                        <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.awayScore}</Text>
                                                                    </View>
                                                                    <View style={{ alignSelf: 'center' }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.status == '未開賽' ? '开放预测赛事' : item.status == '比賽中' ? '正在进行赛事' : '最终结果'}</Text>
                                                                    </View>
                                                                    <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                        <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        );
                                                    })
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </ScrollView>
                                        <ScrollView horizontal={true} style={styles.tabContent}>
                                            <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                            </View>
                                        </ScrollView>
                                        <ScrollView horizontal={true} style={styles.tabContent}>
                                            <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                            </View>
                                        </ScrollView>
                                    </Tabs>
                                    :
                                    null
                            }
                            {
                                this.state.CurrentIndex == 1 ?
                                    <ScrollView horizontal={true} style={styles.tabContent}>
                                        {
                                            this.state.GameList.filter(item => item.ball == 'bk').length ?
                                                this.state.GameList.filter(item => item.ball == 'bk').map(item => {
                                                    return (
                                                        <View style={styles.matchContent} key={item.gameID}>
                                                            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                </View>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                                                    <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Image source={require('../../static/icon_arrow_left.png')} style={{ marginRight: 15 }} />
                                                                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', }}>VS</Text>
                                                                        <Image source={require('../../static/icon_arrow_right.png')} style={{ marginLeft: 15 }} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Image source={require('../../static/icon_brothers_sub.png')} />
                                                                </View>
                                                            </View>
                                                            <View style={{ marginLeft: 30, marginRight: 30, flex: 1, }} >
                                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.homeName}</Text>
                                                                        <Text style={{ marginTop: 4, marginLeft: 10, color: '#AFAAA9', fontSize: 7, }}>主场队伍</Text>
                                                                    </View>
                                                                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <Text style={{ marginTop: 4, marginRight: 10, color: '#AFAAA9', fontSize: 7, }}>客场队伍</Text>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.awayName}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.homeScore}</Text>
                                                                    <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.awayScore}</Text>
                                                                </View>
                                                                <View style={{ alignSelf: 'center' }}>
                                                                    <Text style={{ color: '#fff', fontSize: 11, }}>{item.status == '未開賽' ? '开放预测赛事' : item.status == '比賽中' ? '正在进行赛事' : '最终结果'}</Text>
                                                                </View>
                                                                <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                    <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                })
                                                :
                                                <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                </View>
                                        }
                                    </ScrollView>
                                    :
                                    null
                            }
                            {
                                this.state.CurrentIndex == 2 ?
                                    <ScrollView horizontal={true} style={styles.tabContent}>
                                        {
                                            this.state.GameList.filter(item => item.ball == 'sc').length ?
                                                this.state.GameList.filter(item => item.ball == 'sc').map(item => {
                                                    return (
                                                        <View style={styles.matchContent} key={item.gameID}>
                                                            <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                </View>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                                                    <View style={{ marginTop: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                        <Image source={require('../../static/icon_arrow_left.png')} style={{ marginRight: 15 }} />
                                                                        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center', }}>VS</Text>
                                                                        <Image source={require('../../static/icon_arrow_right.png')} style={{ marginLeft: 15 }} />
                                                                    </View>
                                                                </View>
                                                                <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                    <Image source={require('../../static/icon_brothers_sub.png')} />
                                                                </View>
                                                            </View>
                                                            <View style={{ marginLeft: 30, marginRight: 30, flex: 1, }} >
                                                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.homeName}</Text>
                                                                        <Text style={{ marginTop: 4, marginLeft: 10, color: '#AFAAA9', fontSize: 7, }}>主场队伍</Text>
                                                                    </View>
                                                                    <View style={{ display: 'flex', flexDirection: 'row', }}>
                                                                        <Text style={{ marginTop: 4, marginRight: 10, color: '#AFAAA9', fontSize: 7, }}>客场队伍</Text>
                                                                        <Text style={{ color: '#fff', fontSize: 11, }}>{item.awayName}</Text>
                                                                    </View>
                                                                </View>
                                                                <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.homeScore}</Text>
                                                                    <Text style={{ color: '#fff', fontSize: 26, fontWeight: 'bold', }}>{item.awayScore}</Text>
                                                                </View>
                                                                <View style={{ alignSelf: 'center' }}>
                                                                    <Text style={{ color: '#fff', fontSize: 11, }}>{item.status == '未開賽' ? '开放预测赛事' : item.status == '比賽中' ? '正在进行赛事' : '最终结果'}</Text>
                                                                </View>
                                                                <View style={{ marginTop: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                                                    <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                    <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                })
                                                :
                                                <View style={{ display: 'flex', width: Dimensions.get('window').width, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                </View>
                                        }
                                    </ScrollView>
                                    :
                                    null
                            }
                        </View>
                        <View style={styles.provider}></View>
                        <View style={styles.activity}>
                            <Text style={styles.title}>活动布告栏</Text>
                            <ScrollView horizontal={true} style={styles.activityContent}>
                                {
                                    this.state.AdList.map((item, index) => {
                                        return (
                                            <Image resizeMode={'stretch'} key={index} source={{ uri: item.uri, cache: 'force-cache' }} style={{ width: 270, height: 120, borderRadius: 10, marginHorizontal: 8, }} />
                                        );
                                    })
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.userAction}>
                            <TouchableOpacity onPress={() => NavigationUtil.goPage(null, 'MainStoreValue')} style={[styles.action, { width: 95, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }]}>
                                <Image source={require('../../static/icon_account.png')} />
                                <Text>帐号储值</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => NavigationUtil.goPage(null, 'Betting')} style={styles.action}>
                                <Image source={require('../../static/icon_xz.png')} />
                                <Text>赛事下注</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => NavigationUtil.goPage(null, 'MainWithdraw')} style={[styles.action, { width: 95, borderTopRightRadius: 0, borderBottomRightRadius: 0 }]}>
                                <Image source={require('../../static/icon_touch_app.png')} />
                                <Text>奖金提取</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.userInfo}>
                            <View style={styles.info}>
                                <Text style={styles.desc}>帐户总值</Text>
                                <Text style={styles.text}>{this.state.WalletAmount}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.desc}>累积奖金</Text>
                                <Text style={styles.text}>{this.state.TotalReturnBouns}</Text>
                            </View>
                            <View style={styles.info}>
                                <Text style={styles.desc}>身份等级</Text>
                                <Text style={styles.text}>{this.state.CurrentLevelName}</Text>
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
    onGameListSuccess: gameList => dispatch(actions.onGameListSuccess(gameList))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

const styles = StyleSheet.create({
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    logo: {
        marginLeft: 30,
        width: 139,
        height: 51,
    },
    match: {
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    matchName: {
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 20,
    },
    triangleLeft: {
        marginTop: 5,
        width: 0,
        height: 0,
        borderTopWidth: 5,
        borderTopColor: 'transparent',
        borderRightWidth: 10,
        borderRightColor: '#000',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
    },
    triangleRight: {
        marginTop: 5,
        width: 0,
        height: 0,
        borderTopWidth: 5,
        borderTopColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: '#000',
        borderBottomWidth: 5,
        borderBottomColor: 'transparent',
    },
    tabs: {
        height: 250,
        marginTop: 15,
    },
    tabBarTextStyle: {
        color: '#464646',
        fontSize: 12,
        display: 'flex',
    },
    tabBarUnderlineStyle: {
        height: 1,
        backgroundColor: '#464646',
    },
    tabContent: {
        height: 180,
        marginTop: 20,
        marginBottom: 20,
    },
    matchContent: {
        display: 'flex',
        width: 315,
        height: 180,
        backgroundColor: '#191515',
        borderRadius: 20,
        marginLeft: 5,
        marginRight: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    activity: {
        marginTop: 20,
    },
    activityContent: {
        marginTop: 15,
    },
    provider: {
        alignSelf: 'center',
        width: 300,
        height: 0,
        borderTopColor: '#666',
        borderTopWidth: 1,
    },
    userAction: {
        marginTop: 50,
        height: 54,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    action: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: 132,
        height: 54,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    userInfo: {
        marginTop: 40,
        height: 57,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#191515',
    },
    info: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 57,
    },
    desc: {
        color: '#AFAAA9',
        fontSize: 11,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
