import React, { Component, Fragment } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class OrganizePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            CurrentLevel: 9,
            CurrentLevelName: '',
            NextLevelName: '',
            NeedRecommendNum: 0,
            RecommendNum: 0,
            NeedTeamNum: 0,
            TeamNum: 0,
            Profit: '',
            Account: '',
            Name: '',
            AccountValue: 0,
            IntroUser: []
        };
    }

    componentDidMount() {
        let levelList = ['实习分析师', '一星分析师', '二星分析师', '三星分析师', '四星分析师', '五星分析师', '黄金分析师', '铂金分析师', '钻石分析师', '点数商'];
        let needRecommendList = [3, 6, 9, 12, 15, 18, 21, 25];
        let needTeamList = [20, 50, 100, 200, 500, 1000, 2000, 5000];
        let profitList = [8, 12, 15, 16, 17, 18, 19, 20];
        let key = Toast.loading('加载中', 0);
        requestApi.get('wallet/getDepositRecord', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            this.setState({
                AccountValue: Math.round(result.wallet.find(item => item.Uid === this.props.userInfo.Uid).WalletAmount)
            });
        });
        requestApi.get('plan/getPlan', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            this.setState({
                CurrentLevel: result.CurrentLevel,
                CurrentLevelName: levelList[result.CurrentLevel],
                NextLevelName: result.CurrentLevel == 8 || result.CurrentLevel == 9 ? '' : levelList[result.CurrentLevel + 1],
                NeedRecommendNum: result.CurrentLevel == 8 || result.CurrentLevel == 9 ? 0 : needRecommendList[result.CurrentLevel],
                NeedTeamNum: result.CurrentLevel == 8 || result.CurrentLevel == 9 ? 0 : needTeamList[result.CurrentLevel],
                RecommendNum: result.IntroCount,
                TeamNum: result.TeamCount,
                Profit: result.CurrentLevel == 8 || result.CurrentLevel == 9 ? 0 : profitList[result.CurrentLevel],
                Account: result.Uid,
                Name: result.Name,
            }, () => {
                if (result.IntroUser.length) {
                    let introUser = [];
                    result.IntroUser.forEach(item => {
                        requestApi.get('plan/getPlanUser', {
                            Uid: this.props.userInfo.Uid,
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

    _handleOtherMember(item) {
        NavigationUtil.pushPage({ reuid: this.props.userInfo.Uid, uid: item.Account }, 'OrganizeOtherMember');
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;
        let navigationBar = <NavigationBar
            statusBar={{ barStyle: 'default' }}
            title={'会员组织'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <ScrollView>
                        <View style={{ display: 'flex', alignItems: 'center', }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={[styles.row, { height: 48, borderRadius: 5, }]}>
                                <View style={[styles.viewForTextStyle, { display: 'flex', justifyContent: 'center', }]}>
                                    <Image style={styles.userImg} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={styles.viewForTextStyle}>
                                    <Text style={styles.position}>{this.state.CurrentLevelName}</Text>
                                </View>
                            </LinearGradient>
                            {
                                this.state.CurrentLevel == 8 || this.state.CurrentLevel == 9 ?
                                    null
                                    :
                                    <Fragment>
                                        <View style={[styles.row, { backgroundColor: '#fff', height: 48, borderRadius: 5, }]}>
                                            <View style={styles.viewForTextStyle}>
                                                <Text style={[styles.desc, { color: '#B88215' }]}>下一阶段挑战</Text>
                                            </View>
                                            <View style={styles.viewForTextStyle}>
                                                <Text style={{ color: '#B88215' }}>{this.state.NextLevelName}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.space]}>
                                            <View style={styles.viewForTextStyle}>
                                                <View style={styles.radioBox}></View>
                                                <Text style={styles.task}>直推数{this.state.NeedRecommendNum}位</Text>
                                            </View>
                                            <View style={styles.viewForTextStyle}>
                                                <Text style={[styles.task, styles.complete]}>目前累计{this.state.RecommendNum}位</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.space]}>
                                            <View style={styles.viewForTextStyle}>
                                                <View style={styles.radioBox}></View>
                                                <Text style={styles.task}>团队数{this.state.NeedTeamNum}位</Text>
                                            </View>
                                            <View style={styles.viewForTextStyle}>
                                                <Text style={[styles.task, styles.complete]}>目前累计{this.state.TeamNum}位</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.tips]}>
                                            <View style={styles.viewForTextStyle}>
                                                <Text style={[styles.complete, { color: '#FE0000', fontSize: 12 }]}>达成{this.state.NextLevelName}挑战-您能获得的代理奖金条件</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.tips]}>
                                            <View style={styles.viewForTextStyle}>
                                                <Image source={require('../../static/icon_thumb_up.png')} style={{ width: 36, height: 32, marginLeft: 5, }} />
                                                <Text style={[styles.complete, { color: '#FE0000', fontSize: 12 }]}>伙伴用户下注成功时获利的{this.state.Profit}%</Text>
                                            </View>
                                        </View>
                                    </Fragment>
                            }
                            <View style={styles.card}>
                                <View style={{ marginBottom: 15, }}>
                                    <Text style={{ color: '#B88215', fontSize: 12, }}>用户详情</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={styles.cardItem}>
                                        <View style={{ marginBottom: 15, }}>
                                            <Text style={{ color: '#B88215', fontSize: 12, }}>帐号：{this.state.Account}</Text>
                                        </View>
                                        <View style={{ marginBottom: 15, }}>
                                            <Text style={{ color: '#B88215', fontSize: 12, }}>姓名：{this.state.Name}</Text>
                                        </View>
                                        <View>
                                            <Text style={{ color: '#B88215', fontSize: 12, }}>等级：{this.state.CurrentLevelName}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.cardItem}>
                                        <View style={{ marginBottom: 15, }}>
                                            <Text style={{ color: '#B88215', fontSize: 12, }}>直推人数：{this.state.RecommendNum}位</Text>
                                        </View>
                                        <View style={{ marginBottom: 15, }}>
                                            <Text style={{ color: '#B88215', fontSize: 12, }}>帐户总值：${this.state.AccountValue}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            {
                                this.state.IntroUser.length ?
                                    <Fragment>
                                        <View style={[styles.row, styles.space, { marginTop: 15, marginBottom: 20, }]}>
                                            <View style={styles.viewForTextStyle}>
                                                <View style={styles.radioBox}></View>
                                                <Text style={[styles.task, { color: '#fff', fontSize: 14, }]}>我的直推</Text>
                                            </View>
                                        </View>
                                        {
                                            this.state.IntroUser.map(item => {
                                                return (
                                                    <View style={styles.other} key={item.Account}>
                                                        <View style={{ width: 265, height: 40, backgroundColor: '#fff', borderRadius: 5, display: 'flex', justifyContent: 'center', paddingLeft: 20, }}>
                                                            <View style={styles.viewForTextStyle}>
                                                                <Text style={{ color: '#BE8E25', fontSize: 12, }}>会员姓名：{item.Name}</Text>
                                                            </View>
                                                            <View style={styles.viewForTextStyle}>
                                                                <Text style={{ color: '#BE8E25', fontSize: 8, }}>等级：{item.CurrentLevelName}</Text>
                                                            </View>
                                                        </View>
                                                        <TouchableOpacity onPress={() => this._handleOtherMember(item)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', width: 58, height: 41, borderRadius: 5, }}>
                                                            <Image source={require('../../static/icon_trending_flat.png')} />
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

export default connect(mapStateToProps)(OrganizePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewForTextStyle: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        width: 339,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 30,
    },
    userImg: {
        width: 50,
        height: 28,
        marginLeft: 20,
        marginRight: 100,
    },
    desc: {
        width: 100,
        marginLeft: 20,
        marginRight: 50,
    },
    radioBox: {
        width: 17,
        height: 17,
        backgroundColor: '#fff',
        borderRadius: 8.5,
        marginLeft: 10,
        marginRight: 20,
    },
    space: {
        height: 20,
        justifyContent: 'space-between',
    },
    task: {
        fontSize: 12,
    },
    tips: {
        marginTop: 30,
    },
    complete: {
        marginLeft: 10,
    },
    card: {
        marginTop: 30,
        width: 339,
        height: 135,
        padding: 18,
        borderRadius: 5,
        backgroundColor: '#fff',
    },
    other: {
        marginBottom: 15,
        width: 339,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
    }
});
