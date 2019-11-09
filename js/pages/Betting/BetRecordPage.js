import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import { Tabs, Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils'

class BetRecordPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            CurrentIndex: 0,
            GameList: [],
        }
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('wallet/getBetRecord', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            let gameListObj = result.find(item => item.Uid == this.props.userInfo.Uid);
            console.log(gameListObj);

            let gameKeyList = Object.keys(gameListObj).filter(item => item != 'Uid' || item != 'docId');
            let gameList = [];
            gameKeyList.forEach(item => {
                requestApi.postJson('wallet/getInstantScore', {
                    Uid: this.props.userInfo.Uid,
                    GameId: item
                }, {
                    authorization: this.props.userInfo.token
                }, result => {
                    gameList.push({
                        ...result,
                        Amount: Math.round(gameListObj[item].Amonut),
                        BetWho: gameListObj[item].BetWho,
                        Win: gameListObj[item].Win,
                    });
                    if (gameList.length == gameKeyList.length) {
                        Portal.remove(key);
                        console.log(gameList);
                        this.setState({ GameList: gameList });
                    }
                });
            });
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
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
            title={'下注记录'}
            style={{ backgroundColor: 'transparent' }}
        />;

        let matchNameList = ['棒球赛事', '篮球赛事', '足球赛事'];

        // let tabs = [
        //     { title: '台湾职棒' },
        //     { title: '美国职棒' },
        //     { title: '日本职棒' },
        //     { title: '韩国职棒' },
        //     { title: '澳洲职棒' },
        //     { title: '台湾职棒' },
        //     { title: '美国职棒' },
        //     { title: '日本职棒' },
        //     { title: '韩国职棒' },
        //     { title: '澳洲职棒' },
        // ];

        let filterKey = this.state.CurrentIndex == 0 ? ['bb', 'tw'] : this.state.CurrentIndex == 1 ? ['bk'] : ['sc'];
        let GameList = this.state.GameList.filter(item => filterKey.indexOf(item.ball) != -1);
        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1 }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <View style={styles.match}>
                        <TouchableOpacity style={styles.triangleLeft}
                            onPress={() => this._handlePrev()} />
                        <Text style={styles.matchName}>{matchNameList[this.state.CurrentIndex]}</Text>
                        <TouchableOpacity style={styles.triangleRight}
                            onPress={() => this._handleNext()} />
                    </View>
                    {/* <View style={styles.tabs}> */}
                    {/* <Tabs
                            tabs={tabs}
                            swipeable={false}
                            tabBarTextStyle={styles.tabBarTextStyle}
                            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                            tabBarBackgroundColor={'transparent'}
                        > */}

                    <View style={styles.tabContent}>
                        {
                            GameList.length ?
                                <ScrollView style={{ flex: 1 }}>
                                    {
                                        GameList.map(item => {
                                            return (
                                                <View key={item.gameID} style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', backgroundColor: '#fff', width: Dimensions.get('window').width - 5, height: 47, borderRadius: 12, marginBottom: 5, }}>
                                                    <View style={{ flex: 1.2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
                                                        <Image style={{ width: 55, height: 34, marginLeft: 10, }} source={require('../../static/icon_brothers_sub.png')} />
                                                        <Text style={{ fontSize: 10 }}>{item.homeName}</Text>
                                                        <Text style={{ fontSize: 22, marginLeft: 10, }}>{item.homeScore}</Text>
                                                    </View>
                                                    <View style={{ flex: .8, display: 'flex', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#A2A1A1' }}>
                                                        <Text style={{ color: '#fff', fontSize: 8, }}>{item.BuyTime}</Text>
                                                        <Text style={{ color: '#fff', fontSize: 8, }}>总下注金额：${item.Amount}</Text>
                                                        <Text style={{ color: '#fff', fontSize: 8, }}>下注{item.BetWho == 'Home' ? item.homeName : item.BetWho == 'Away' ? item.awayName : ''}胜出</Text>
                                                    </View>
                                                    <View style={{ flex: 1.2, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'relative' }}>
                                                        {
                                                            item.Win ?
                                                                <Image style={{ width: 40, height: 40, position: 'absolute', left: -20, bottom: -15, }} source={require('../../static/icon_win.png')} />
                                                                :
                                                                <Image style={{ width: 40, height: 40, position: 'absolute', left: -20, bottom: -15, }} source={require('../../static/icon_lose.png')} />
                                                        }
                                                        <Text style={{ fontSize: 22, }}>{item.awayScore}</Text>
                                                        <Text style={{ fontSize: 10 }}>{item.awayName}</Text>
                                                        <Image style={{ width: 55, height: 34, marginRight: 10, }} source={require('../../static/icon_brothers_sub.png')} />
                                                    </View>
                                                </View>
                                            );
                                        })
                                    }
                                </ScrollView>
                                :
                                <View style={{ flex: 1, display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>此类型赛事</Text>
                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无下注资料</Text>
                                </View>
                        }
                    </View>
                    {/* <View style={styles.tabContent}>
                                <Text>Content of Second Tab</Text>
                            </View>
                            <View style={styles.tabContent}>
                                <Text>Content of Third Tab</Text>
                            </View> */}
                    {/* </Tabs> */}
                    {/* </View> */}
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    match: {
        alignSelf: 'center',
        width: 150,
        marginTop: 20,
        marginBottom: 5,
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
        marginTop: 5,
        height: 230,
    },
    tabBarTextStyle: {

    },
    tabBarUnderlineStyle: {

    },
    tabContent: {
        marginTop: 20,
        flex: 1,
    },
});

let mapStateToProps = state => ({
    userInfo: state.userInfo,
    gameList: state.gameList
});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(BetRecordPage);