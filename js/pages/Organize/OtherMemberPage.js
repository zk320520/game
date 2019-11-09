import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class OtherMemberPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            Account: '',
            RecommendNum: 0,
            Name: '',
            AccountValue: 0,
            CurrentLevel: 0,
            CurrentLevelName: '',
            IntroUser: []
        };
    }

    componentDidMount() {
        let levelList = ['实习分析师', '一星分析师', '二星分析师', '三星分析师', '四星分析师', '五星分析师', '黄金分析师', '铂金分析师', '钻石分析师', '点数商'];
        let key = Toast.loading('加载中', 0);
        // requestApi.get('wallet/getDepositRecord', {
        //     Uid: this.params.uid
        // }, {
        //     authorization: this.props.userInfo.token
        // }, res => {
        //     console.log(res);
        //     this.setState({
        //         AccountValue: Math.round(result.wallet.find(item => item.Uid === this.params.uid).WalletAmount)
        //     });
        // });
        requestApi.get('plan/getPlanUser', {
            Uid: this.params.reuid,
            docId: this.params.uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            this.setState({
                Account: result.Uid,
                Name: result.Name,
                RecommendNum: result.IntroCount,
                CurrentLevel: result.CurrentLevel,
                CurrentLevelName: levelList[result.CurrentLevel]
            }, () => {
                if (result.IntroUser.length) {
                    let introUser = [];
                    result.IntroUser.forEach(item => {
                        requestApi.get('plan/getPlanUser', {
                            Uid: this.params.reuid,
                            docId: item.Uid
                        }, {
                            authorization: this.props.userInfo.token
                        }, res => {
                            introUser.push({
                                Account: res.Uid,
                                AccountValue: 0,
                                RecommendNum: res.IntroCount,
                                Name: res.Name,
                                CurrentLevelName: levelList[res.CurrentLevel],
                                IntroUser: res.IntroUser
                            });
                            if (introUser.length === result.IntroUser.length) {
                                Portal.remove(key);
                                this.setState({
                                    IntroUser: introUser
                                });
                            }
                        });
                    });
                } else {
                    Portal.remove(key);
                }
            });
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handleOtherMember(item) {
        NavigationUtil.pushPage({ reuid: this.params.reuid, uid: item.Account }, 'OrganizeOtherMember');
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
            title={'会员组织'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')} >
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <View style={{ paddingHorizontal: 20, alignItems: 'center', }}>
                        <View style={styles.card}>
                            <View style={{ marginBottom: 6 }}>
                                <Text style={styles.title}>用户详情</Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                <View style={styles.cardItem}>
                                    <View style={[styles.viewForTextStyle, { marginVertical: 6 }]}>
                                        <Text style={{ color: '#B88215', fontSize: 12, }}>帐号：{this.state.Account}</Text>
                                    </View>
                                    <View style={[styles.viewForTextStyle, { marginVertical: 6 }]}>
                                        <Text style={{ color: '#B88215', fontSize: 12, }}>姓名：{this.state.Name}</Text>
                                    </View>
                                    <View style={[styles.viewForTextStyle, { marginVertical: 6 }]}>
                                        <Text style={{ color: '#B88215', fontSize: 12, }}>等级：{this.state.CurrentLevelName}</Text>
                                    </View>
                                </View>
                                <View style={styles.cardItem}>
                                    <View style={[styles.viewForTextStyle, { marginVertical: 6 }]}>
                                        <Text style={{ color: '#B88215', fontSize: 12, }}>直推人数：{this.state.RecommendNum}位</Text>
                                    </View>
                                    {/* <View style={[styles.viewForTextStyle, { marginVertical: 6 }]}>
                                        <Text style={{ color: '#B88215', fontSize: 12, }}>帐户总值：${this.state.AccountValue}</Text>
                                    </View> */}
                                </View>
                            </View>
                        </View>
                        {
                            this.state.IntroUser.length ?
                                <Fragment>
                                    <View style={{ alignSelf: 'flex-start', marginBottom: 20, }}>
                                        <View style={styles.viewForTextStyle}>
                                            <View style={styles.radioBox}></View>
                                            <Text style={styles.task}>组织伙伴</Text>
                                        </View>
                                    </View>
                                    {
                                        this.state.IntroUser.map(item => {
                                            return (
                                                <View style={styles.other} key={item.Account}>
                                                    <View style={{ width: 265, height: 40, backgroundColor: '#B88318', borderRadius: 5, display: 'flex', justifyContent: 'center', paddingLeft: 20, }}>
                                                        <View style={styles.viewForTextStyle}>
                                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>会员姓名：{item.Name}</Text>
                                                        </View>
                                                        <View style={styles.viewForTextStyle}>
                                                            <Text style={{ color: '#fff', fontSize: 8, }}>等级：{item.CurrentLevelName}</Text>
                                                        </View>
                                                    </View>
                                                    <TouchableOpacity onPress={() => this._handleOtherMember(item)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#B88318', width: 58, height: 41, borderRadius: 5, }}>
                                                        <Image source={require('../../static/icon_trending_flat_white.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })
                                    }
                                </Fragment>
                                :
                                null
                        }
                    </View>
                </SafeAreaView>
            </ImageBackground >
        );
    }
};

let mapStateToProps = state => ({
    userInfo: state.userInfo,
    gameList: state.gameList,
});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(OtherMemberPage);

const styles = StyleSheet.create({
    title: {
        color: '#B88215',
        fontSize: 12,
        fontWeight: 'bold',
    },
    viewForTextStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        width: 329,
        height: 135,
        padding: 20,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginVertical: 15,
    },
    cardItem: {
        marginTop: 5,
    },
    radioBox: {
        width: 12,
        height: 12,
        backgroundColor: '#BA881D',
        borderRadius: 6,
        marginHorizontal: 10,
    },
    task: {
        color: '#BA881D',
        fontSize: 14,
    },
    space: {
        justifyContent: 'space-between',
    },
    other: {
        width: 329,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginBottom: 15,
    }
});
