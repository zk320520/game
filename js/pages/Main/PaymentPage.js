import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, Image, TouchableOpacity, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

export default class PaymentPage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.params = this.props.navigation.state.params;
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
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <WebView source={{ uri: this.params.uri }} />
                </SafeAreaView>
            </ImageBackground>
        );
    }
}