import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils/index';

class VersionPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            Version: ''
        };
    }

    componentDidMount() {
        requestApi.get('system/getVersion', null, null, result => {
            let key = Object.keys(result).find(item => item != 'docId');
            this.setState({
                Version: result[key]
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
            title={'版本资讯'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <View style={{ display: 'flex', alignItems: 'center', marginTop: 20, }}>
                        <View style={{ width: 339, height: 192, padding: 20, backgroundColor: '#fff', borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Image source={require('../../static/logo.png')} />
                            <Text style={{ fontSize: 20, }}>{this.state.Version}</Text>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>当前为最新版本</Text>
                        </View>
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

export default connect(mapStateToProps)(VersionPage);