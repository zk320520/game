import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Portal } from '@ant-design/react-native';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class SecretManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            Content: ''
        };
    }

    componentDidMount() {
        let key = Toast.loading('加载中', 0);
        requestApi.get('system/getPrivacyPolicy', null, null, result => {
            Portal.remove(key);
            this.setState({
                Content: result.Content
            });
        });
    }

    _handleSubmit() {
        let key = Toast.loading('内容提交中', 0);
        requestApi.postJson('system/updatePrivacyPolicy', {
            Uid: this.props.userInfo.Uid,
            Content: this.state.Content
        }, {
            authorization: this.props.userInfo.token,
        }, result => {
            Portal.remove(key);
            Toast.success('提交成功');
        });
    }

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
            title={'隐私政策管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20, height: 505, backgroundColor: '#fff', borderRadius: 20, }}>
                        <ScrollView>
                            <TextInput placeholder={'输入内容......'} autoFocus={true} autoCapitalize={'none'} style={{ margin: 20, }} multiline={true} value={this.state.Content} onChangeText={text => this.setState({ Content: text })} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity onPress={() => this._handleSubmit()} style={{ marginTop: 80, alignSelf: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center', width: 300, height: 28, borderRadius: 14, backgroundColor: '#F5A400', }}>
                        <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>内容提交</Text>
                    </TouchableOpacity>
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

export default connect(mapStateToProps)(SecretManagerPage);