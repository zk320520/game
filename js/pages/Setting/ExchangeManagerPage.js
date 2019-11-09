import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, TextInput, Dimensions, } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import { ECharts } from 'react-native-echarts-wrapper';
import dayjs from 'dayjs';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi, dateRange } from '../../utils/index';

class ExchangeManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            TWDUSD: '',
            RMBUSD: '',
            JPYUSD: '',
            CNYState: 'date',
            TWDState: 'date'
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('system/getCurrencyRate', null, null, result => {
            Portal.remove(key);
            this.setState({
                TWDUSD: result.TWDUSD.toString(),
                RMBUSD: result.RMBUSD.toString(),
                JPYUSD: result.JPYUSD.toString(),
            }, () => {
                this.initChart1();
                // this.initChart2();
            });
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handleSumit() {
        let key = Toast.loading('更新中', 0);
        requestApi.postJson('system/updateCurrencyRate', {
            Uid: this.props.userInfo.Uid,
            TWDUSD: this.state.TWDUSD,
            RMBUSD: this.state.RMBUSD,
            JPYUSD: this.state.JPYUSD,
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
        });
    }

    onData1 = param => { };

    onRef1 = ref => {
        if (ref) this.chart1 = ref;
    };

    onData2 = param => { };

    onRef2 = ref => {
        if (ref) this.chart2 = ref;
    };

    _handleCNYRate(type) {
        this.setState({
            CNYState: type
        }, () => {
            this.initChart1('', '', type);
        });
    }
 
    initChart1 = (symbols = 'CNY', base = 'USD', type = 'date') => {
        let startDate = type == 'date' ? dayjs(dateRange.getCurrentWeek()[0]).format('YYYY-MM-DD') : dayjs(dateRange.getCurrentMonth()[0]).format('YYYY-MM-DD');
        let endDate = type == 'date' ? dayjs(dateRange.getCurrentWeek()[1]).format('YYYY-MM-DD') : dayjs(dateRange.getCurrentMonth()[1]).format('YYYY-MM-DD');
        requestApi.get('https://api.exchangeratesapi.io/history', {
            start_at: startDate,
            end_at: endDate,
            symbols,
            base
        }, null, result => {
            let xData = Object.keys(result.rates).sort((a, b) => (dayjs(a) - dayjs(b)));
            let seriesData = xData.map(item => {
                return result.rates[item].CNY;
            });
            option = {
                // title: {
                //     text: "人民币 对 美金 汇率",
                //     textStyle: {
                //         fontSize: 10, 
                //         fontWeight: 'bold'
                //     }
                // },
                xAxis: {
                    type: "category",
                    data: xData,
                    splitLine: { 
                        show: true 
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: "value",
                    splitLine: { 
                        show: false 
                    },
                    axisTick: {
                        inside: true
                    },
                    scale: true
                },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        data: seriesData
                    }
                ],
                axisPointer: {
                    show: true
                }
            };
            console.log(JSON.stringify(option));
            this.chart1.setOption(option);
        });
    };

    _handleTWDRate(type) {

    }

    initChart2 = (symbols = 'TWD', base = 'USD', type = 'date') => {
        let startDate = type == 'date' ? dayjs(dateRange.getCurrentWeek()[0]).format('YYYY-MM-DD') : dayjs(dateRange.getCurrentMonth()[0]).format('YYYY-MM-DD');
        let endDate = type == 'date' ? dayjs(dateRange.getCurrentWeek()[1]).format('YYYY-MM-DD') : dayjs(dateRange.getCurrentMonth()[0]).format('YYYY-MM-DD');
        requestApi.get('https://api.exchangeratesapi.io/history', {
            start_at: startDate,
            end_at: endDate,
            symbols,
            base
        }, null, result => {
            let xData = Object.keys(result.rates).sort((a, b) => (dayjs(a) - dayjs(b)));
            let seriesData = xData.map(item => {
                return result.rates[item].CNY;
            });
            option = {
                // title: {
                //     text: "台币 对 美金 汇率",
                //     textStyle: {
                //         fontSize: 10,
                //         fontWeight: 'bold'
                //     }
                // },
                xAxis: {
                    type: "category",
                    data: xData,
                    splitLine: { 
                        show: true 
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 40
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                yAxis: {
                    type: "value",
                    splitLine: { 
                        show: false 
                    },
                    axisTick: {
                        inside: true
                    },
                    scale: true
                },
                series: [
                    {
                        type: "line",
                        smooth: true,
                        data: seriesData
                    }
                ]
            };
            console.log(JSON.stringify(option));
            this.chart2.setOption(option);
        });
    };

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
            title={'即时汇率管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <ScrollView>
                        <View style={{ height: 265, backgroundColor: '#fff', marginBottom: 20, }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ marginTop: 20, paddingHorizontal: 20, width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', }}>人民币 对 美金 汇率</Text>
                                    <View style={{ width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => this._handleCNYRate('month')} style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#AF9E54' }, this.state.CNYState == 'month' ? { backgroundColor: '#E5DA8B' } : { backgroundColor: '#fff' }]}>
                                            <Text style={{ fontSize: 10, }}>月</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleCNYRate('date')} style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#AF9E54' }, this.state.CNYState == 'date' ? { backgroundColor: '#E5DA8B' } : { backgroundColor: '#fff' }]}>
                                            <Text style={{ fontSize: 10, }}>周</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <ECharts
                                option={{}}
                                ref={this.onRef1}
                                onData={this.onData1}
                            />
                        </View>
                        {/* <View style={{ height: 265, backgroundColor: '#fff', marginBottom: 20, }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                <View style={{ marginTop: 20, paddingHorizontal: 20, width: Dimensions.get('window').width, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 10, fontWeight: 'bold', }}>台币 对 美金 汇率</Text>
                                    <View style={{ width: 50, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                        <TouchableOpacity onPress={() => this._handleTWDRate('month')} style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#AF9E54' }, this.state.CNYState == 'month' ? { backgroundColor: '#E5DA8B' } : { backgroundColor: '#fff' }]}>
                                            <Text style={{ fontSize: 10, }}>月</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._handleTWDRate('date')} style={[{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 22, height: 22, borderRadius: 11, borderWidth: 1, borderColor: '#AF9E54' }, this.state.CNYState == 'date' ? { backgroundColor: '#E5DA8B' } : { backgroundColor: '#fff' }]}>
                                            <Text style={{ fontSize: 10, }}>周</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <ECharts
                                option={{}}
                                ref={this.onRef2}
                                onData={this.onData2}
                            />
                        </View> */}
                        <View style={{ marginHorizontal: 20, height: 95, backgroundColor: '#fff', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, display: 'flex', justifyContent: 'space-around', marginTop: 50, }}>
                            <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', }}>台币 : 美金</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>汇率：</Text>
                                <TextInput autoCapitalize={'none'} value={this.state.TWDUSD} style={{ width: 203, height: 26, textAlign: 'center', }} onChangeText={text => this.setState({ TWDUSD: text })} />
                            </View>
                        </View>
                        <View style={{ marginHorizontal: 20, height: 95, backgroundColor: '#fff', borderRadius: 5, paddingHorizontal: 20, paddingVertical: 10, display: 'flex', justifyContent: 'space-around', marginTop: 50, }}>
                            <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', }}>人民币 : 美金</Text>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', marginRight: 20, }}>汇率：</Text>
                                <TextInput autoCapitalize={'none'} value={this.state.RMBUSD} style={{ width: 203, height: 26, textAlign: 'center' }} onChangeText={text => this.setState({ RMBUSD: text })} />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this._handleSumit()} style={{ marginTop: 50, alignSelf: 'center', width: 300, height: 28, backgroundColor: '#F5A400', borderRadius: 14, }}>
                            <Text style={{ alignSelf: 'center', lineHeight: 28, color: '#fff', fontSize: 16, fontWeight: 'bold' }}>汇率提交</Text>
                        </TouchableOpacity>
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
});

export default connect(mapStateToProps)(ExchangeManagerPage);