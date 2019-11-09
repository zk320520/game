import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, TouchableOpacity, Image, Text, } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { connect } from 'react-redux';
import MatchCarousel from '../../component/MatchCarousel';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';

class LanguagePage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            selectLanguage: 0
        };
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
            title={'语言设置'}
            style={{ backgroundColor: 'transparent' }}
        />;

        let radioProps = [
            { label: '繁体中文', value: 0 },
            { label: '简体中文', value: 1 },
            { label: 'English', value: 2 }
        ];
        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    <MatchCarousel gameList={this.props.gameList} />
                    {navigationBar}
                    <RadioForm
                        animation={false}
                        style={{ marginTop: 20 }}
                    >
                        {
                            radioProps.map((obj, i) => {
                                return (
                                    <RadioButton labelHorizontal={true} key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', height: 44, borderBottomWidth: 1, borderBottomColor: '#F2F2F2', backgroundColor: '#fff' }}>
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={this.state.selectLanguage === i}
                                            onPress={type => {
                                                this.setState({
                                                    selectLanguage: type
                                                });
                                            }}
                                            borderWidth={1}
                                            buttonInnerColor={'transparent'}
                                            buttonOuterColor={'transparent'}
                                            buttonSize={17}
                                            buttonOuterSize={17}
                                            buttonStyle={{ backgroundColor: '#D8D8D8', marginLeft: 50, marginRight: 80, }}
                                            buttonWrapStyle={{}}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={type => {
                                                this.setState({
                                                    selectLanguage: type
                                                });
                                            }}
                                            labelStyle={{ fontSize: 14, color: '#000' }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                );
                            })
                        }
                    </RadioForm>
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

export default connect(mapStateToProps)(LanguagePage);