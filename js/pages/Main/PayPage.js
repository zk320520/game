import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class PayPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
        this.state = {
            CountryCode: '',
            Country: '',
            BankName: '',
            BankBranch: '',
            Name: '',
            Phone: '',
            Account: 0,
            Product: '',
            Time: ''
        };
    }

    componentDidMount() {
        let countryList = {
            886: '台湾',
            86: '中国',
            852: '香港',
            81: 'にっぽん',
            65: 'Singapore',
            60: 'Malaysia ',
            62: 'Indonesia 62',
            91: 'India 91',
            84: 'ViệtNam 84',
            855: 'Kambodia 855',
            82: '한국 82',
            66: 'ประเทศไทย 66',
        };
        let key = Toast.loading('加载中', 0);
        requestApi.get('user/getUserInfo', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            this.setState({
                CountryCode: result.CountryCode,
                Country: countryList[result.CountryCode],
                BankName: result.BankName,
                BankBranch: result.BankBranch,
                BankAccount: result.BankAccount,
                Name: result.Name,
                Phone: result.Phone
            }, () => {
                Portal.remove(key);
                requestApi.get('system/getGiftProduct', {
                    number: this.params.amount
                }, null, res => {
                    this.setState({
                        Product: res.Product
                    });
                });
                requestApi.get('system/getCurrencyRate', null, null, res => {
                    if (result.CountryCode == 886) {
                        this.setState({
                            Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            Account: this.params.amount * res["TWDUSD"]
                        });
                    } else if (result.CountryCode == 86) {
                        this.setState({
                            Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            Account: this.params.amount * res["RMBUSD"]
                        });
                    } else {
                        this.setState({
                            Time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                            Account: this.params.amount
                        });
                    }
                });
            });
        })
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handlePay(type) {
        let key = Toast.loading('加载中', 0);
        if (type == 'chaoshang') {
            requestApi.postJson('wallet/cvsdeposit', {
                Uid: this.props.userInfo.Uid,
                Phone: this.props.userInfo.Phone,
                Name: this.props.userInfo.Name,
                Remark: true,
                Amount: this.state.Account,
                Mode: 'PRODUCTION',
                GiftAddress: '',
            }, {
                authorization: this.props.userInfo.token
            }, result => {
                Portal.remove(key);
                console.log(result);
                NavigationUtil.goPage({ uri: result.paymentUrl }, 'MainPayment');
            });
        } else {
            requestApi.postJson('wallet/deposit', {
                Uid: this.props.userInfo.Uid,
                Phone: this.props.userInfo.Phone,
                Name: this.props.userInfo.Name,
                Remark: true,
                Amount: this.state.Account,
                Mode: 'PRODUCTION',
                GiftAddress: '',
            }, {
                authorization: this.props.userInfo.token
            }, result => {
                Portal.remove(key);
                console.log(result);
                NavigationUtil.goPage({ uri: result.paymentUrl }, 'MainPayment');
            });
        }
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
            style={{ backgroundColor: 'transparent' }}
        />;
        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <View style={{ display: 'flex', width: Dimensions.get('window').width - 20, marginHorizontal: 20, }}>
                        <Text style={{ marginTop: 10, color: '#895D05', fontSize: 14, fontWeight: 'bold' }}>用户对帐资料：</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>地区：{this.state.Country}</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>地区：{this.state.BankName}</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>分行：{this.state.BankBranch}</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>帐号：{this.state.BankAccount}</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>本人：{this.state.Name}</Text>
                        <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>联络电话：{this.state.Phone}</Text>
                    </View>
                    <View style={{ marginTop: 10, marginHorizontal: 20, display: 'flex', flexDirection: 'row', }}>
                        <View style={{ flex: 1, dispatch: 'flex', alignItems: 'flex-start', }}>
                            <Text style={{ marginTop: 10, color: '#895D05', fontSize: 14, fontWeight: 'bold' }}>方案赠品</Text>
                            <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>{this.state.Product}</Text>
                            {/* <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}></Text> */}
                        </View>
                        <View style={{ flex: 1, dispatch: 'flex', alignItems: 'flex-end', }}>
                            <Text style={{ marginTop: 10, color: '#895D05', fontSize: 14, fontWeight: 'bold' }}>訂單時間</Text>
                            <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>{this.state.Time}</Text>
                            <Text style={{ marginTop: 10, color: '#895D05', fontSize: 14, fontWeight: 'bold' }}>訂單金額</Text>
                            <Text style={{ marginTop: 10, color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>${this.state.Account}  {this.state.CountryCode == '886' ? '台幣' : this.state.CountryCode == '86' ? '人民幣' : '美金'}</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10, alignItems: 'center', marginHorizontal: 20 }}>
                        {
                            this.state.CountryCode == 886 ?
                                <Fragment>
                                    <TouchableOpacity onPress={() => this._handlePay('ecpay')} style={{ padding: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: 322, height: 111, marginTop: 50, backgroundColor: '#fff', borderRadius: 10, }}>
                                        <Image source={require('../../static/ec_pay.png')} style={{ width: 167, height: 100 }} />
                                    </TouchableOpacity>
                                    {
                                        this.params.amount == 500
                                            ?
                                            <TouchableOpacity onPress={() => this._handlePay('chaoshang')} style={{ padding: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: 322, height: 111, marginTop: 50, backgroundColor: '#fff', borderRadius: 10, }}>
                                                <Image source={require('../../static/ec_pay.png')} style={{ width: 167, height: 100 }} />
                                            </TouchableOpacity>
                                            :
                                            null
                                    }
                                </Fragment>
                                :
                                <TouchableOpacity onPress={() => this._handlePay('unionpay')} style={{ padding: 10, display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: 322, height: 111, marginTop: 50, backgroundColor: '#fff', borderRadius: 10, }}>
                                    <Image source={require('../../static/union_pay.png')} style={{ width: 128, height: 80 }} />
                                </TouchableOpacity>
                        }
                    </View>
                </SafeAreaView>
            </ImageBackground >
        );
    }
};

let mapStateToProps = state => ({
    userInfo: state.userInfo,
    gameList: state.gameList
});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(PayPage);