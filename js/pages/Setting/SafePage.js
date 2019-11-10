import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, TextInput, Image, ImageBackground, Dimensions } from 'react-native';
import { Tabs, Toast, Portal, Modal } from '@ant-design/react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi, bank, chinaBank } from '../../utils/index';

class SafePage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            CountryCode: '886',
            BankName: '',
            BankBranch: '',
            BankAccount: '',
            BanchList: [],
            BankImg: null,
            Password: '',
            ChangePassword: '',
            ConfirmPassword: '',
            ShowAccountModal: false,
            ShowPwdModal: false,
            ChangeAccountStatus: false,
            ChangePwdStatus: false
        };
    }

    // 选择图片
    selectPhotoTapped() {
        const options = {
            title: '选择图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '选择照片',
            cameraType: 'back',
            mediaType: 'photo',
            videoQuality: 'high',
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
                    avatarSource: source
                });
            }
        });
    }

    _handleConfirmAccount() {

    }

    _handleConfirmPwd() {
        if (!this.state.Password) {
            return Toast.offline('目前密码不能为空');
        } else if (!this.state.ChangePassword) {
            return Toast.offline('欲更改密码不能为空');
        } else if (!this.state.ConfirmPassword) {
            return Toast.offline('确认更改密码不能为空');
        } else if (this.state.ConfirmPassword != this.state.ChangePassword) {
            return Toast.offline('欲更改密码与确认更改密码不一致');
        }

        requestApi.post('user/updatePassword', {
            Uid: this.props.userInfo.Uid,
            Password: this.state.Password,
            ChangePassword: this.state.ChangePassword
        }, {
            authorization: this.props.userInfo.token
        }, result => {

        });
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    render() {
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

        let tabs = [
            { title: '银行帐号设置' },
            { title: '密码修改' },
        ];
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

        return (
            <ImageBackground style={{ flex: 1, backgroundColor: '#000', }} source={require('../../static/bg_register.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={[styles.container, {  alignSelf: 'center', }]}>
                        <Tabs
                            tabs={tabs}
                            swipeable={false}
                            tabBarTextStyle={styles.tabBarTextStyle}
                            tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                            tabBarBackgroundColor={'transparent'}
                        >
                            <View style={styles.tabContent}>
                                <RadioForm
                                    formHorizontal={true}
                                    animation={false}
                                    style={{ marginVertical: 25, }}
                                >
                                    {
                                        radioProps.map((obj, i) => {
                                            return (
                                                <RadioButton labelHorizontal={true} key={i} style={{ marginHorizontal: 25, }}>
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
                                                        buttonStyle={{ backgroundColor: '#fff' }}
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
                                                                banchList: [],
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

                                    onPress={() => this._handleConfirmAccount()}
                                >
                                    <Text style={styles.confirmText}>变更帐号验证</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.tabContent}>
                                <View style={{ width: 336, height: 250, }}>
                                    <View style={{ alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 5, }}>
                                        <Text style={{ color: '#AC7508', fontSize: 16, fontWeight: 'bold', alignSelf: 'flex-start', marginBottom: 20, }}>密码找回</Text>
                                        <View style={[styles.inputWraper, { borderBottomColor: '#AC7508' }]}>
                                            <TextInput autoCapitalize={'none'} secureTextEntry={true} style={[styles.input, { color: '#333' }]} value={this.state.Password} onChangeText={text => this.setState({ Password: text })} placeholder={'请输入目前密码'} placeholderTextColor={'#D9D7D1'} />
                                        </View>
                                        <View style={[styles.inputWraper, { borderBottomColor: '#AC7508' }]}>
                                            <TextInput autoCapitalize={'none'} secureTextEntry={true} style={[styles.input, { color: '#333' }]} value={this.state.ChangePassword} onChangeText={text => this.setState({ ChangePassword: text })} placeholder={'输入欲更改密码'} placeholderTextColor={'#D9D7D1'} />
                                        </View>
                                        <View style={[styles.inputWraper, { borderBottomColor: '#AC7508' }]}>
                                            <TextInput autoCapitalize={'none'} secureTextEntry={true} style={[styles.input, { color: '#333' }]} value={this.state.ConfirmPassword} onChangeText={text => this.setState({ ConfirmPassword: text })} placeholder={'确认更改密码'} placeholderTextColor={'#D9D7D1'} />
                                        </View>
                                        <TouchableOpacity
                                            style={{ width: 108, height: 28, backgroundColor: '#AC7508', borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}

                                            onPress={() => this._handleConfirmPwd()}
                                        >
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>确认重设密码</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Tabs>
                    </View>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.ShowAccountModal}
                        onClose={() => this.setState({ ShowAccountModal: false })}
                        style={{ width: 329, height: 329, borderRadius: 5, backgroundColor: '#fff', }}
                    >
                        {
                            this.state.ChangeAccountStatus ?
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_check_circle.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#229A0D', fontSize: 30, }}>变更帐户成功</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_warning_sign.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>变更帐户成功失败</Text>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>身份验证资料不完整</Text>
                                    </View>
                                </View>
                        }
                    </Modal>
                    <Modal
                        animationType={'fade'}
                        transparent
                        maskClosable
                        visible={this.state.ShowPwdModal}
                        onClose={() => this.setState({ ShowPwdModal: false })}
                        style={{ width: 329, height: 329, borderRadius: 5, backgroundColor: '#fff', }}
                    >
                        {
                            this.state.ChangePwdStatus ?
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_check_circle.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#229A0D', fontSize: 30, }}>成功修改密码</Text>
                                    </View>
                                </View>
                                :
                                <View style={{ height: 280, display: 'flex', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <Image source={require('../../static/icon_warning_sign.png')} />
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>修改失败</Text>
                                        <Text style={{ color: '#FE0000', fontSize: 30, }}>密码输入错误</Text>
                                    </View>
                                </View>
                        }
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

export default connect(mapStateToProps)(SafePage);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    tabBarTextStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        width: 100,
    },
    tabBarUnderlineStyle: {
        height: 1,
        backgroundColor: '#fff',
    },
    tabContent: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputWraper: {
        width: 290,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FFD481',
    },
    inputWraper1: {
        width: 290,
        marginBottom: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5,
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
