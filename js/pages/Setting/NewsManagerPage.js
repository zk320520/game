import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Toast, Portal, Modal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class NewsManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            MarqueeList: [],
            ShowAdd: false,
            News: ''
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('system/getMarquee', null, null, result => {
            Portal.remove(key);
            this.setState({
                MarqueeList: result.filter(item => item.Active)
            });
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _handleDelete(item) {
        let key = Toast.loading('删除中', 0);
        requestApi.postJson('system/updateMarquee', {
            Uid: this.props.userInfo.Uid,
            docId: item.docId,
            Active: false
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            let index = this.state.MarqueeList.findIndex(e => e.docId == item.docId);
            this.state.MarqueeList.splice(index, 1);
            this.setState({
                MarqueeList: this.state.MarqueeList
            });
        });
    }

    _handleAdd() {
        this.setState({
            ShowAdd: true
        });
    }

    _handleSave() {
        let key = Toast.loading('新增中', 0);
        requestApi.postJson('system/createMarquee', {
            Uid: this.props.userInfo.Uid,
            Content: this.state.News,
            Place: 'dashboard'
        }, {
            authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            this.state.MarqueeList.unshift(result);
            this.setState({
                MarqueeList: this.state.MarqueeList,
                ShowAdd: false,
                News: ''
            });
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
            title={'广告资讯管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ alignSelf: 'center', width: 150, marginTop: 20, marginBottom: 5, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
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
                                onPress={() => { }} />
                            <View style={{ paddingLeft: 10, paddingRight: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', marginBottom: 10, }}>APP</Text>
                                <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', }}>跑马灯公告</Text>
                            </View>
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
                                onPress={() => { }} />
                        </View>
                        <ScrollView style={{ marginVertical: 20, }}>
                            {
                                this.state.MarqueeList.length ?
                                    this.state.MarqueeList.map(item => {
                                        return (
                                            <View key={item.docId} style={{ marginHorizontal: 20, marginBottom: 20, padding: 20, backgroundColor: '#fff', borderRadius: 15, }}>
                                                <View style={{ marginLeft: 30, marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                    <Text style={{ color: '#36C2CF', fontSize: 12, }}>{item.CreatedAt}</Text>
                                                    <TouchableOpacity onPress={() => this._handleDelete(item)}>
                                                        <Image source={require('../../static/icon_delete.png')} />
                                                    </TouchableOpacity>
                                                </View>
                                                <View style={{ marginLeft: 30, marginBottom: 20, }}>
                                                    <Text style={{ color: '#353535', fontSize: 15, }}>{item.Content}</Text>
                                                </View>
                                            </View>
                                        );
                                    })
                                    :
                                    null
                            }
                        </ScrollView>
                        <TouchableOpacity onPress={() => this._handleAdd()} style={{ alignSelf: 'center', display: 'flex', width: 300, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5A400', borderRadius: 14, }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>新增公告</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.ShowAdd}
                        onClose={() => this.setState({ ShowAdd: false })}
                        style={{ width: 336, height: 314, borderRadius: 15, backgroundColor: '#fff', }}
                    >
                        <View style={{ display: 'flex', height: 250, justifyContent: 'space-between', margin: 20, }}>
                            <TextInput multiline={true} placeholder={'输入内容......'}  autoFocus={true} autoCapitalize={'none'} value={this.state.News} onChangeText={text => this.setState({ News: text })} />
                            <TouchableOpacity onPress={() => this._handleSave()} style={{ alignSelf: 'center', display: 'flex', width: 300, height: 28, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5A400', borderRadius: 14, }}>
                                <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>新增公告</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
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

export default connect(mapStateToProps)(NewsManagerPage);