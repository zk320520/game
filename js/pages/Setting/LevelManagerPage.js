import React, { Component } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class LevelManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {

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
            title={'等级条件管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1 }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1 }}>
                    {navigationBar}
                    <View style={{ marginTop: 20, alignSelf: 'center', }}>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>实习分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>一星分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>二星分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>三星分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>四星分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>五星分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>黄金分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 15, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>铂金分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleLink()}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#FEF0A1', '#B47E11']} style={{ width: 339, display: 'flex', flexDirection: 'row', marginBottom: 20, height: 48, borderRadius: 5, }}>
                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                                    <Image style={{ width: 50, height: 28, marginLeft: 20, marginRight: 100, }} source={require('../../static/icon_bp.png')} />
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ fontSize: 16, }}>钻石分析师</Text>
                                </View>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this._handleLink()} style={{ alignSelf: 'center', width: 300, height: 28, backgroundColor: '#F5A400', borderRadius: 14, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', }}>新增等级</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
};

let mapStateToProps = state => ({});

let mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps)(LevelManagerPage);