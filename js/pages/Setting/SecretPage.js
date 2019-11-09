import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Toast, Portal } from '@ant-design/react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class SecretPage extends Component {
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
            title={'隐私安全'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <View style={{ marginTop: 40, marginLeft: 20, marginRight: 20, height: 505, backgroundColor: '#fff', borderRadius: 20, }}>
                        <ScrollView>
                            <Text style={{ margin: 20 }}>{this.state.Content}</Text>
                        </ScrollView>
                    </View>
                    <View style={{ marginTop: 20, marginLeft: 10, }}>
                        <Image source={require('../../static/icon_logo.png')} />
                    </View>
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

export default connect(mapStateToProps)(SecretPage);