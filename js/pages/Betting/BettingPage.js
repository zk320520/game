import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { Carousel, Toast, Portal, Tabs } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class BettingPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);

        this.state = {
            CurrentIndex: 0,
            selectedTeam: 0,
            radioProps: []
        };
    }

    componentDidMount() {

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

    _handleConfirm() {

    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            rightButton={
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', }}>
                    <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }} onPress={() => this.props.navigation.navigate('BetRecord')}>
                        <Text style={{ color: '#AC7508' }}>观看下注记录</Text>
                        <Image source={require('../../static/icon_right.png')} />
                    </TouchableOpacity>
                </View>
            }
            title={'进行下注'}
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
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <ScrollView>
                        <View style={styles.match}>
                            <TouchableOpacity style={styles.triangleLeft}
                                onPress={() => this._handlePrev()} />
                            <Text style={styles.matchName}>{matchNameList[this.state.CurrentIndex]}</Text>
                            <TouchableOpacity style={styles.triangleRight}
                                onPress={() => this._handleNext()} />
                        </View>
                        <View style={styles.tabs}>
                            {
                                this.state.CurrentIndex == 0 ?
                                    <Tabs
                                        tabs={tabs}
                                        swipeable={false}
                                        tabBarTextStyle={{ fontSize: 12, fontWeight: 'bold' }}
                                        tabBarUnderlineStyle={{ height: 1, backgroundColor: '#464646', }}
                                        tabBarBackgroundColor={'transparent'}
                                    >
                                        <View style={styles.tabContent}>
                                            {
                                                this.props.gameList.filter(item => { return item.leagueID == 'tw_13' && item.status == '未開賽'; }).length ?
                                                    <Carousel
                                                        dots={false}
                                                        afterChange={() => { }}
                                                    >
                                                        {
                                                            this.props.gameList.filter(item => { return item.leagueID == 'tw_13' && item.status == '未開賽'; }).map(item => {
                                                                return (
                                                                    <View style={styles.containerHorizontal} key={item.gameID}>
                                                                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                            </View>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[0]}</Text>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[1]}</Text>
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
                                                                        <View style={{ marginLeft: 30, marginRight: 30, flex: 1, display: 'flex', justifyContent: 'space-between', }} >
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
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'center', marginBottom: 15, }}>
                                                                                <Text style={{ color: '#fff', fontSize: 14, }}>下注开放中</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })
                                                        }
                                                    </Carousel>
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </View>
                                        <View style={styles.tabContent}>
                                            {
                                                this.props.gameList.filter(item => { return (item.leagueID == 'bb_1' || item.leagueID == 'bb_5') && item.status == '未開賽'; }).length ?
                                                    <Carousel
                                                        dots={false}
                                                        afterChange={() => { }}
                                                    >
                                                        {
                                                            this.props.gameList.filter(item => { return (item.leagueID == 'bb_1' || item.leagueID == 'bb_5') && item.status == '未開賽'; }).map(item => {
                                                                return (
                                                                    <View style={styles.containerHorizontal} key={item.gameID}>
                                                                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                            </View>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[0]}</Text>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[1]}</Text>
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
                                                                        <View style={{ marginLeft: 30, marginRight: 30, flex: 1, display: 'flex', justifyContent: 'space-between', }} >
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
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'center', marginBottom: 15, }}>
                                                                                <Text style={{ color: '#fff', fontSize: 14, }}>下注开放中</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })
                                                        }
                                                    </Carousel>
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </View>
                                        <View style={styles.tabContent}>
                                            {
                                                this.props.gameList.filter(item => { return (item.leagueID == 'bb_2' || item.leagueID == 'bb_10') && item.status == '未開賽'; }).length ?
                                                    <Carousel
                                                        dots={false}
                                                        afterChange={() => { }}
                                                    >
                                                        {
                                                            this.props.gameList.filter(item => { return (item.leagueID == 'bb_2' || item.leagueID == 'bb_10') && item.status == '未開賽'; }).map(item => {
                                                                return (
                                                                    <View style={styles.containerHorizontal} key={item.gameID}>
                                                                        <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                            </View>
                                                                            <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[0]}</Text>
                                                                                <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[1]}</Text>
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
                                                                        <View style={{ marginLeft: 30, marginRight: 30, flex: 1, display: 'flex', justifyContent: 'space-between', }} >
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
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                                <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                            </View>
                                                                            <View style={{ alignSelf: 'center', marginBottom: 15, }}>
                                                                                <Text style={{ color: '#fff', fontSize: 14, }}>下注开放中</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                );
                                                            })
                                                        }
                                                    </Carousel>
                                                    :
                                                    <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                    </View>
                                            }
                                        </View>
                                        <View style={styles.tabContent}>
                                            <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                            </View>
                                        </View>
                                        <View style={styles.tabContent}>
                                            <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                            </View>
                                        </View>
                                    </Tabs>
                                    :
                                    null
                            }
                            {
                                this.state.CurrentIndex == 1 ?
                                    <View style={styles.tabContent}>
                                        {
                                            this.props.gameList.filter(item => { return item.ball == 'bk' && item.status == '未開賽'; }).length ?
                                                <Carousel
                                                    dots={false}
                                                    afterChange={() => { }}
                                                >
                                                    {
                                                        this.props.gameList.filter(item => { return item.ball == 'bk' && item.status == '未開賽'; }).map(item => {
                                                            return (
                                                                <View style={styles.containerHorizontal} key={item.gameID}>
                                                                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                            <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                        </View>
                                                                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[0]}</Text>
                                                                            <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[1]}</Text>
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
                                                                    <View style={{ marginLeft: 30, marginRight: 30, flex: 1, display: 'flex', justifyContent: 'space-between', }} >
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
                                                                            <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                            <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                        </View>
                                                                        <View style={{ alignSelf: 'center', marginBottom: 15, }}>
                                                                            <Text style={{ color: '#fff', fontSize: 14, }}>下注开放中</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            );
                                                        })
                                                    }
                                                </Carousel>
                                                :
                                                <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                </View>
                                        }
                                    </View>
                                    :
                                    null
                            }
                            {
                                this.state.CurrentIndex == 2 ?
                                    <View style={styles.tabContent}>
                                        {
                                            this.props.gameList.filter(item => { return item.ball == 'bb' && item.status == '未開賽'; }).length ?
                                                <Carousel
                                                    dots={false}
                                                    afterChange={() => { }}
                                                >
                                                    {
                                                        this.props.gameList.filter(item => { return item.ball == 'bb' && item.status == '未開賽'; }).map(item => {
                                                            return (
                                                                <View style={styles.containerHorizontal} key={item.gameID}>
                                                                    <View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                                                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                            <Image source={require('../../static/icon_Guardians_sub.png')} />
                                                                        </View>
                                                                        <View style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                                                            <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[0]}</Text>
                                                                            <Text style={{ color: '#fff', fontSize: 11, textAlign: 'center', }}>{item.startTime.split('T')[1]}</Text>
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
                                                                    <View style={{ marginLeft: 30, marginRight: 30, flex: 1, display: 'flex', justifyContent: 'space-between', }} >
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
                                                                            <Text style={{ color: '#AFAAA9', fontSize: 8, }}>10W3L</Text>
                                                                            <Text style={{ color: '#AFAAA9', fontSize: 8, }}>8W3L</Text>
                                                                        </View>
                                                                        <View style={{ alignSelf: 'center', marginBottom: 15, }}>
                                                                            <Text style={{ color: '#fff', fontSize: 14, }}>下注开放中</Text>
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            );
                                                        })
                                                    }
                                                </Carousel>
                                                :
                                                <View style={{ display: 'flex', width: Dimensions.get('window').width, height: 180, justifyContent: 'center', alignItems: 'center' }}>
                                                    <Text style={{ color: '#EA1212', fontSize: 12, fontWeight: 'bold', }}>尚无此类型赛事</Text>
                                                </View>
                                        }
                                    </View>
                                    :
                                    null
                            }
                        </View>
                        <View style={styles.bet}>
                            <Text style={styles.betTitle}>选择下注胜出</Text>
                            <View style={styles.cart}>
                                <TouchableOpacity style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('window').width - 20, height: 58, backgroundColor: '#fff', borderRadius: 5 }} onPress={() => {}}>
                                    <Text style={{ width: 21, height: 21, borderRadius: 10.5, backgroundColor: '#E2C348' }}></Text>
                                    <Image style={{ width: 30, height: 46, }} source={require('../../static/icon_Guardians_sub.png')} />
                                    <Text style={{ fontSize: 14 }}>中信兄弟</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: Dimensions.get('window').width - 20, height: 58, backgroundColor: '#fff', borderRadius: 5 }} onPress={() => {}}>
                                    <Text style={{ width: 21, height: 21, borderRadius: 10.5, backgroundColor: '#E2C348' }}></Text>
                                    <Image style={{ width: 30, height: 46, }} source={require('../../static/icon_Guardians_sub.png')} />
                                    <Text style={{ fontSize: 14 }}>中信兄弟</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.confirm} onPress={() => this._handleConfirm()}>
                                <Text style={styles.confirmText}>确认下注</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

let mapStateToProps = state => ({
    userInfo: state.userInfo,
    gameList: state.gameList
});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(BettingPage);

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
        height: 220,
    },
    tabContent: {
        marginTop: 20,
        height: 180,
    },
    containerHorizontal: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 10,
        paddingVertical: 10,
        height: 175,
        borderRadius: 20,
        backgroundColor: '#191515',
    },
    cart: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    betTitle: {
        marginTop: 30,
        marginLeft: 30,
        fontSize: 18,
    },
    confirm: {
        marginTop: 20,
        width: 355,
        height: 40,
        alignSelf: 'center',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#F5A400',
    },
    confirmText: {
        color: '#fff',
        textAlign: 'center',
    },
});
