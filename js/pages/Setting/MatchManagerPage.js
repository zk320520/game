import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Dimensions, Switch } from 'react-native';
import { Toast, Portal, Tabs, } from '@ant-design/react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class MatchManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            CurrentIndex: 0,
            GameList: []
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.postJson('admin/getTodayBetGame', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            console.log(result);
            Portal.remove(key);

            this.setState({
                GameList: result
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

    _handleOpen(obj) {
        let key = Toast.loading('设置中', 0);
        let GameList = this.state.GameList.map(item => {
            if (item.gameID == obj.gameID) {
                item.Available = !obj.Available;
            }
            return item;
        });
        this.setState({
            GameList
        });
        requestApi.postJson('admin/setAvailableBetGame', {
            Uid: this.props.userInfo.Uid,
            gameId: obj.gameID,
            Available: !obj.Available
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
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
            title={'球赛管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        let matchNameList = ['棒球赛事', '篮球赛事', '足球赛事'];
        let tabs = [
            { title: '台湾职棒' },
            { title: '美国职棒' },
            { title: '日本职棒' },
            { title: '韩国职棒' },
            { title: '澳洲职棒' }
        ];

        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1 }}>
                    {navigationBar}
                    {
                        this.state.GameList.length ?
                            <Fragment>
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
                                    <Text style={{ paddingLeft: 10, paddingRight: 10, fontSize: 20, }}>{matchNameList[this.state.CurrentIndex]}</Text>
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
                                <ScrollView>
                                    <View style={{ marginTop: 5, width: Dimensions.get('window').width }}>
                                        {
                                            this.state.CurrentIndex == 0 ?
                                                <Tabs
                                                    tabs={tabs}
                                                    swipeable={false}
                                                    tabBarTextStyle={{ fontSize: 12, fontWeight: 'bold', }}
                                                    tabBarUnderlineStyle={{ height: 1, backgroundColor: '#464646', }}
                                                    tabBarBackgroundColor={'transparent'}
                                                >
                                                    <View style={{ marginTop: 20, }} key={1}>
                                                        {
                                                            this.state.GameList.filter(item => item.leagueID == 'tw_13').length ?
                                                                this.state.GameList.filter(item => item.leagueID == 'tw_13').map(item => {
                                                                    return (
                                                                        <View key={item.gameID} style={{ height: 93, backgroundColor: '#191515', padding: 15, display: 'flex', justifyContent: 'space-between', marginBottom: 15, }}>
                                                                            <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>开始时间：{item.startTime.split('T')[1]}</Text>
                                                                            <View style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Image style={{ width: 20, height: 34, marginRight: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.homeName}</Text>
                                                                                </View>
                                                                                <Text style={{ color: '#fff', fontSize: 16, }}>VS</Text>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.awayName}</Text>
                                                                                    <Image style={{ width: 20, height: 34, marginLeft: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                </View>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 8, }}>开放下注</Text>
                                                                                <Switch
                                                                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                                                                                    value={item.Available}
                                                                                    onValueChange={() => this._handleOpen(item)}
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    );
                                                                })
                                                                :
                                                                <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                        }
                                                    </View>
                                                    <View style={{ marginTop: 20, }} key={2}>
                                                        {
                                                            this.state.GameList.filter(item => item.leagueID == 'bb_1' || item.leagueID == 'bb_5' || item.leagueID == 'bb_4').length ?
                                                                this.state.GameList.filter(item => item.leagueID == 'bb_1' || item.leagueID == 'bb_5' || item.leagueID == 'bb_4').map(item => {
                                                                    return (
                                                                        <View key={item.gameID} style={{ height: 93, backgroundColor: '#191515', padding: 15, display: 'flex', justifyContent: 'space-between', marginBottom: 15, }}>
                                                                            <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>开始时间：{item.startTime.split('T')[1]}</Text>
                                                                            <View style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Image style={{ width: 20, height: 34, marginRight: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.homeName}</Text>
                                                                                </View>
                                                                                <Text style={{ color: '#fff', fontSize: 16, }}>VS</Text>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.awayName}</Text>
                                                                                    <Image style={{ width: 20, height: 34, marginLeft: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                </View>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 8, }}>开放下注</Text>
                                                                                <Switch
                                                                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                                                                                    value={item.Available}
                                                                                    onValueChange={() => this._handleOpen(item)}
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    );
                                                                })
                                                                :
                                                                <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                        }
                                                    </View>
                                                    <View style={{ marginTop: 20, }} key={3}>
                                                        {
                                                            this.state.GameList.filter(item => item.leagueID == 'bb_2' || item.leagueID == 'bb_10').length ?
                                                                this.state.GameList.filter(item => item.leagueID == 'bb_2' || item.leagueID == 'bb_10').map(item => {
                                                                    return (
                                                                        <View key={item.gameID} style={{ height: 93, backgroundColor: '#191515', padding: 10, display: 'flex', justifyContent: 'space-between', marginBottom: 15, }}>
                                                                            <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>开始时间：{item.startTime.split('T')[1]}</Text>
                                                                            <View style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Image style={{ width: 20, height: 34, marginRight: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.homeName}</Text>
                                                                                </View>
                                                                                <Text style={{ color: '#fff', fontSize: 16, }}>VS</Text>
                                                                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                    <Text style={{ color: '#fff', fontSize: 10, }}>{item.awayName}</Text>
                                                                                    <Image style={{ width: 20, height: 34, marginLeft: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                </View>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 8, }}>开放下注</Text>
                                                                                <Switch
                                                                                    style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                                                                                    value={item.Available}
                                                                                    onValueChange={() => this._handleOpen(item)}
                                                                                />
                                                                            </View>
                                                                        </View>
                                                                    );
                                                                })
                                                                :
                                                                <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                        }
                                                    </View>
                                                    <View style={{ marginTop: 20, }} key={4}>
                                                        <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                                    <View style={{ marginTop: 20, }} key={5}>
                                                        <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                                </Tabs>
                                                :
                                                null
                                        }
                                        {
                                            this.state.CurrentIndex == 1 ?
                                                <View style={{ marginTop: 20, }}>
                                                    {
                                                        this.state.GameList.filter(item => item.ball == 'bk').length ?
                                                            this.state.GameList.filter(item => item.ball == 'bk').map(item => {
                                                                return (
                                                                    <View key={item.gameID} style={{ height: 93, backgroundColor: '#191515', padding: 15, display: 'flex', justifyContent: 'space-between', marginBottom: 15, }}>
                                                                        <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>开始时间：{item.startTime.split('T')[1]}</Text>
                                                                        <View style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Image style={{ width: 20, height: 34, marginRight: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                <Text style={{ color: '#fff', fontSize: 10, }}>{item.homeName}</Text>
                                                                            </View>
                                                                            <Text style={{ color: '#fff', fontSize: 16, }}>VS</Text>
                                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Text style={{ color: '#fff', fontSize: 10, }}>{item.awayName}</Text>
                                                                                <Image style={{ width: 20, height: 34, marginLeft: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 8, }}>开放下注</Text>
                                                                            <Switch
                                                                                style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                                                                                value={item.Available}
                                                                                onValueChange={() => this._handleOpen(item)}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })
                                                            :
                                                            <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    }
                                                </View>
                                                :
                                                null
                                        }
                                        {
                                            this.state.CurrentIndex == 2 ?
                                                <View style={{ marginTop: 20, }}>
                                                    {
                                                        this.state.GameList.filter(item => item.ball == 'sc').length ?
                                                            this.state.GameList.filter(item => item.ball == 'sc').map(item => {
                                                                return (
                                                                    <View key={item.gameID} style={{ height: 93, backgroundColor: '#191515', padding: 15, display: 'flex', justifyContent: 'space-between', marginBottom: 15, }}>
                                                                        <Text style={{ alignSelf: 'center', color: '#fff', fontSize: 10 }}>开始时间：{item.startTime.split('T')[1]}</Text>
                                                                        <View style={{ width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Image style={{ width: 20, height: 34, marginRight: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                                <Text style={{ color: '#fff', fontSize: 10, }}>{item.homeName}</Text>
                                                                            </View>
                                                                            <Text style={{ color: '#fff', fontSize: 16, }}>VS</Text>
                                                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                                <Text style={{ color: '#fff', fontSize: 10, }}>{item.awayName}</Text>
                                                                                <Image style={{ width: 20, height: 34, marginLeft: 15, }} source={require('../../static/icon_Guardians_sub.png')}></Image>
                                                                            </View>
                                                                        </View>
                                                                        <View style={{ alignSelf: 'flex-end', marginRight: 5, marginBottom: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 8, }}>开放下注</Text>
                                                                            <Switch
                                                                                style={{ transform: [{ scaleX: .6 }, { scaleY: .6 }] }}
                                                                                value={item.Available}
                                                                                onValueChange={() => this._handleOpen(item)}
                                                                            />
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })
                                                            :
                                                            <Text style={{ alignSelf: 'center', color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    }
                                                </View>
                                                :
                                                null
                                        }
                                    </View>
                                </ScrollView>
                            </Fragment>
                            :
                            null
                    }
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

export default connect(mapStateToProps)(MatchManagerPage);