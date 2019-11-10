import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Portal } from '@ant-design/react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import NavigationUtil from '../../navigator/NavigationUtil';
import NavigationBar from '../../component/NavigationBar';
import { requestApi, bank, chinaBank } from '../../utils/index';
import actions from '../../action/index';

class ConfirmPage extends Component {
    static navigationOptions = {
        header: null
    };
    
    constructor(props) {
        super(props);
        this.state = {
            CountryCode: '886',
            BankName: '',
            BankBranch: '',
            BankAccount: '',
            BanchList: [],
            BankImg: null
        };
    }

    _handleConfirm() {
        if (!this.state.BankName) {
            Toast.offline('银行不能为空');
            return false;
        } else if (!this.state.BankBranch) {
            Toast.offline('分行不能为空');
            return false;
        } else if (!this.state.BankAccount) {
            Toast.offline('银行帐号不能为空');
            return false;
        } else if (!this.state.BankImg) {
            Toast.offline('银行卡正面影本不能为空');
            return false;
        }

        let key = Toast.loading('注册中', 0);
        requestApi.postJson('user/createUser', {
            ...userInfo,
            ...this.state
        }, {}, async (result) => {
            let { userInfo, onRegisterSuccess, navigation } = this.props;

            let userInfo2 = JSON.stringify({ Email: userInfo.Email, Password: userInfo.Password });
            let userToken = result.token;
            await Promise.all([
                AsyncStorage.setItem('userInfo', userInfo2),
                AsyncStorage.setItem('userToken', userToken)
            ]);

            onRegisterSuccess(result);
            Portal.remove(key);
            navigation.navigate('AppStack');
        });
    }

    //选择图片
    selectPhotoTapped() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            cameraType: 'back',
            mediaType: 'photo',
            durationLimit: 10,
            maxWidth: 300,
            maxHeight: 300,
            quality: 0.8,
            angle: 0,
            allowsEditing: false,
            noData: false,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    BankImg: source
                });
            }
        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
        let radioProps = [
            { label: '台湾用户', value: '886' },
            { label: '中国用户', value: '86' }
        ];
        let twbankList = bank.filter(item => {
            return !item.branchCode;
        }).map(item => {
            return {
                key: item.bankCode,
                label: item.bankName,
                value: item.bankCode
            };
        });
        let chinaBankList = chinaBank.map(item => {
            return {
                key: item.enName,
                label: item.bankName,
                value: item.enName
            };
        })
        let bankList = this.state.CountryCode == 886 ? twbankList : chinaBankList;

        let navigationBar = <NavigationBar
            leftButton={
                <TouchableOpacity
                    style={{ width: 60, height: 24, marginLeft: 12, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}
                    onPress={() => this._onBack()}
                >
                    <Image source={require('../../static/icon_arrow_back.png')} />
                    <Text style={{ marginLeft: 6, color: '#AC7508', fontSize: 12, }}>返回</Text>
                </TouchableOpacity>
            }
            title={''}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, backgroundColor: '#000' }} source={require('../../static/bg_register.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={styles.container}>
                        <RadioForm
                            formHorizontal={true}
                            animation={false}
                            style={{ marginBottom: 50 }}
                        >
                            {
                                radioProps.map((obj, i) => {
                                    return (
                                        <RadioButton labelHorizontal={true} key={i} style={{ marginLeft: 50, marginRight: 50 }}>
                                            <RadioButtonInput
                                                obj={obj}
                                                index={i}
                                                isSelected={this.state.CountryCode === obj.value}
                                                onPress={value => {
                                                    this.setState({
                                                        BankName: '',
                                                        BankBranch: '',
                                                        BankAccount: '',
                                                        BankImg: null,
                                                        banchList: [],
                                                        CountryCode: value
                                                    });
                                                }}
                                                borderWidth={1}
                                                buttonInnerColor={this.state.CountryCode === obj.value ? '#FFD481' : '#fff'}
                                                buttonOuterColor={this.state.CountryCode === obj.value ? '#fff' : '#FFD481'}
                                                buttonSize={10}
                                                buttonOuterSize={16}
                                                buttonStyle={{}}
                                                buttonWrapStyle={{ marginTop: 2 }}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                labelHorizontal={true}
                                                onPress={value => {
                                                    this.setState({
                                                        BankName: '',
                                                        BankBranch: '',
                                                        BankAccount: '',
                                                        BankImg: null,
                                                        BanchList: [],
                                                        CountryCode: value
                                                    });
                                                }}
                                                labelStyle={{ fontSize: 14, color: '#FFD481' }}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                    );
                                })
                            }
                        </RadioForm>

                        {
                            this.state.CountryCode == 886 ?
                                <View style={{}}>
                                    <View style={styles.inputWraper}>
                                        <RNPickerSelect
                                            style={{ ...pickerStyle, }}
                                            placeholderTextColor={'#FFD481'}
                                            placeholder={{ label: '选择银行', value: '选择银行', key: '选择银行' }}
                                            onValueChange={value => {
                                                if (this.state.CountryCode == 886) {
                                                    let banchList = bank.filter(item => {
                                                        return item.bankCode == value && item.branchCode;
                                                    }).map(item => {
                                                        return {
                                                            key: item.branchCode,
                                                            label: item.bankName,
                                                            value: item.branchCode
                                                        }
                                                    });
                                                    this.setState({
                                                        BankName: value,
                                                        BanchList: banchList
                                                    });
                                                }
                                            }}
                                            items={bankList}
                                            Icon={() => {
                                                return <Image source={require('../../static/icon_arrow_down.png')} />
                                            }}
                                        />
                                    </View>
                                    <View style={styles.inputWraper}>
                                        <RNPickerSelect
                                            style={{ ...pickerStyle, iconContainer: {} }}
                                            placeholderTextColor={'#FFD481'}
                                            placeholder={{ label: '选择分行', value: '选择分行' }}
                                            onValueChange={value => {
                                                this.setState({
                                                    BankBranch: value
                                                });
                                            }}
                                            items={this.state.BanchList}
                                            Icon={() => {
                                                return <Image source={require('../../static/icon_arrow_down.png')} />
                                            }}
                                        />
                                    </View>
                                </View>
                                :
                                <View style={styles.inputWraper}>
                                    <RNPickerSelect
                                        style={{ ...pickerStyle, }}
                                        placeholderTextColor={'#FFD481'}
                                        placeholder={{ label: '选择银行', value: '选择银行', key: '选择银行' }}
                                        onValueChange={value => {
                                            if (this.state.CountryCode == 886) {
                                                let banchList = bank.filter(item => {
                                                    return item.bankCode == value && item.branchCode;
                                                }).map(item => {
                                                    return {
                                                        key: item.branchCode,
                                                        label: item.bankName,
                                                        value: item.branchCode
                                                    }
                                                });
                                                this.setState({
                                                    BankName: value,
                                                    BanchList: banchList
                                                });
                                            }
                                        }}
                                        items={bankList}
                                        Icon={() => {
                                            return <Image source={require('../../static/icon_arrow_down.png')} />
                                        }}
                                    />
                                </View>
                        }
                        <View style={styles.inputWraper}>
                            <TextInput style={styles.input} placeholder={'输入完整银行帐号'} placeholderTextColor={'#FFD481'} />
                        </View>
                        <View style={styles.upload}>
                            <Text style={styles.tip}>上传存折封面影本</Text>
                            <TouchableOpacity style={styles.photo} onPress={() => this.selectPhotoTapped()}>
                                <View style={[styles.avatar, styles.avatarContainer, { marginBottom: 30 }]}>
                                    {this.state.BankImg === null ? <Image source={require('../../static/icon_camera.png')} /> :
                                        <Image style={styles.avatar} source={this.state.BankImg} />
                                    }
                                </View>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.confirm}

                            onPress={() => this._handleConfirm()}
                        >
                            <Text style={styles.confirmText}>确认身份验证</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ImageBackground>
        );
    }
}

const mapStateToProps = state => ({
    userInfo: state.userInfo
});

const mapDispatchToProps = dispatch => ({
    onRegisterSuccess: userInfo => dispatch(actions.onRegisterSuccess(userInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmPage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWraper: {
        width: 290,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD481',
    },
    input: {
        color: '#FFD481',
    },
    upload: {
        width: 290,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 50,
    },
    tip: {
        color: '#FFD481',
        marginBottom: 10,
    },
    photo: {
        width: 290,
        height: 147,
        borderWidth: 1,
        borderColor: '#FFD481',
        borderStyle: 'dashed',
        borderRadius: 10
    },
    confirm: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
        height: 28,
        marginTop: 20,
        borderRadius: 28,
        backgroundColor: '#F5A400',
    },
    confirmText: {
        color: '#fff',
        textAlign: 'center',
    },
    avatarContainer: {
        width: 290,
        height: 147,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avatar: {
        width: 290,
        height: 147,
        borderRadius: 10,
    }
});

const pickerStyle = StyleSheet.create({
    inputIOS: {
        color: '#FFD481',
    },
    inputAndroid: {
        color: '#FFD481',
    },
});