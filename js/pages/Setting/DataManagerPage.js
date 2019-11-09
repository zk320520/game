import React, { Component } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, ImageBackground, Dimensions } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import { ECharts } from 'react-native-echarts-wrapper';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class DataManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            TWPassCount: 0,
            CNPassCount: 0,
            HWPassCount: 0,
            TWUnPassCount: 0,
            CNUnPassCount: 0,
            HWUnPassCount: 0
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.postJson('admin/getAlluser', {
            Uid: this.props.userInfo.Uid
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            const TWPassCount = result.filter(item => item.user.BankVerify && item.user.CountryCode == 886).length;
            const CNPassCount = result.filter(item => item.user.BankVerify && item.user.CountryCode == 86).length;
            const HWPassCount = result.filter(item => item.user.BankVerify && [852, 81, 65, 60, 62, 91, 84, 855, 82, 66].indexOf(item.user.CountryCode) + 1).length;
            const TWUnPassCount = result.filter(item => !item.user.BankVerify && item.user.CountryCode == 886).length;
            const CNUnPassCount = result.filter(item => !item.user.BankVerify && item.user.CountryCode == 86).length;
            const HWUnPassCount = result.filter(item => !item.user.BankVerify && [852, 81, 65, 60, 62, 91, 84, 855, 82, 66].indexOf(item.user.CountryCode) + 1).length;
            this.setState({
                TWPassCount,
                CNPassCount,
                HWPassCount,
                TWUnPassCount,
                CNUnPassCount,
                HWUnPassCount
            }, () => {
                let list1 = result.filter(item => item.user.CountryCode == 86).length;
                let list2 = result.filter(item => item.user.CountryCode == 886).length;
                let list3 = result.filter(item => item.user.CountryCode == 852).length;
                let list4 = result.filter(item => item.user.CountryCode == 81).length;
                let list5 = result.filter(item => item.user.CountryCode == 65).length;
                let list6 = result.filter(item => item.user.CountryCode == 60).length;
                let list7 = result.filter(item => item.user.CountryCode == 62).length;
                let list8 = result.filter(item => item.user.CountryCode == 91).length;
                let list9 = result.filter(item => item.user.CountryCode == 84).length;
                let list10 = result.filter(item => item.user.CountryCode == 855).length;
                let list11 = result.filter(item => item.user.CountryCode == 82).length;
                let list12 = result.filter(item => item.user.CountryCode == 66).length;

                let option = {
                    title: [
                        {
                            text: '注册总人数',
                            subtext: result.length + '位',
                            textStyle: {
                                color: '#000',
                                fontSize: 12,
                            },
                            subtextStyle: {
                                color: '#000',
                                fontSize: 18,
                            },
                            textAlign: "center",
                            x: 'center',
                            y: 'center',
                        }
                    ],
                    avoidLabelOverlap: false,
                    series: [
                        {
                            type: 'pie',
                            radius: ['80%', '90%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    formatter: '{b}\n{d}%',
                                    position: ''
                                },
                            },
                            animation: false,
                            data: [
                                { value: list1, legendname: '中国', name: '中国 86' },
                                { value: list2, legendname: '台灣', name: '台灣 886' },
                                { value: list3, legendname: '香港', name: '香港 852' },
                                { value: list4, legendname: 'にっぽん', name: 'にっぽん 81' },
                                { value: list5, legendname: 'Singapore', name: 'Singapore 65' },
                                { value: list6, legendname: 'Malaysia', name: 'Malaysia 60' },
                                { value: list7, legendname: 'Indonesia', name: 'Indonesia 62' },
                                { value: list8, legendname: 'India', name: 'India 91' },
                                { value: list9, legendname: 'ViệtNam', name: 'ViệtNam 84' },
                                { value: list10, legendname: 'Kambodia', name: 'Kambodia 855' },
                                { value: list11, legendname: '한국', name: '한국 82' },
                                { value: list12, legendname: 'ประเทศไทย', name: 'ประเทศไทย 66' },
                            ]
                        }
                    ]
                };
                this.chart.setOption(option);
            });
        });
    }

    onData = param => { };

    onRef = ref => {
        if (ref) this.chart = ref;
    };

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
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
            title={'数据报告'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <ScrollView>
                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#fff', marginTop: 20, }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>台湾已通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.TWPassCount}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>中国已通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.CNPassCount}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>海外已通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.HWPassCount}</Text>
                        </View>

                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, borderTopLeftRadius: 10, borderTopRightRadius: 10, backgroundColor: '#fff', marginTop: 20, }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>台湾未通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.TWUnPassCount}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>中国未通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.CNUnPassCount}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 357, height: 60, backgroundColor: '#fff', marginTop: 1 }}>
                            <Text style={{ fontSize: 15, marginLeft: 50 }}>海外未通过验证人数</Text>
                            <Text style={{ color: '#AC7508', fontSize: 15, fontWeight: 'bold', marginRight: 25, }}>{this.state.HWUnPassCount}</Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: 311, marginTop: 50, }}>
                            <Text style={{ color: '#AC7508', fontSize: 12, fontWeight: 'bold' }}>系统用户国家分布图</Text>
                            <Text style={{ width: 311, height: 1, backgroundColor: '#AC7508', marginTop: 15 }}></Text>
                        </View>
                        <View style={{ alignSelf: 'center', width: 311, height: 200, marginTop: 30, }}>
                            <ECharts
                                option={{}}
                                ref={this.onRef}
                                onData={this.onData}
                            />
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
});

export default connect(mapStateToProps)(DataManagerPage);
