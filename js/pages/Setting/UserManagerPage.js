import React, { Component, Fragment } from 'react';
import { SafeAreaView, View, Text, ImageBackground, Image, TextInput, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Toast, Portal } from '@ant-design/react-native';
import ImagePicker from 'react-native-image-picker';
import NavigationBar from '../../component/NavigationBar';
import NavigationUtil from '../../navigator/NavigationUtil';
import { requestApi } from '../../utils';

class UserManagerPage extends Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            userInfoBySearch: {
                Uid: '',
                docId: '',
                BankImg: '',
                Referrer: '',
                BankBranch: '',
                BankAccount: '',
                Admin: false,
                Active: false,
                BankName: '',
                BankVerify: false,

                Name: '',
                Phone: '',
                Email: '',
                IntroCode: '',
                CurrentLevel: '',
                CurrentLevelName: '',
                IntroUser: [],
                Admin: false,
                BankName: '',
                BankBranch: '',
                BankAccount: '',
                Avatar: ''
            },
            Phone: ''
        };
    }

    componentDidMount() {

    }

    _handleSearch() {
        let key = Toast.loading('加载中', 0);
        requestApi.postJson('admin/getUserByPhone', {
            Uid: this.props.userInfo.Uid,
            Phone: this.state.Phone
        }, {
            Authorization: this.props.userInfo.token
        }, result => {
            Portal.remove(key);
            this.setState({
                userInfoBySearch: {
                    Uid: result.user.Uid,
                    docId: result.user.docId,
                    BankImg: result.user.BankImg,
                    Referrer: result.user.Referrer,
                    BankBranch: result.user.BankBranch,
                    BankAccount: result.user.BankAccount,
                    Admin: result.user.Admin,
                    Active: result.user.Active,
                    BankName: result.user.BankName,
                    BankVerify: result.user.BankVerify,

                    Name: result.user.Name,
                    Phone: result.user.Phone,
                    Email: result.user.Email,
                    IntroCode: result.user.IntroCode,
                    CurrentLevel: result.plan.CurrentLevel,
                    CurrentLevelName: ['实习分析师', '一星分析师', '二星分析师', '三星分析师', '四星分析师', '五星分析师', '黄金分析师', '铂金分析师', '钻石分析师', '点数商'][result.plan.CurrentLevel],
                    IntroUser: result.plan.IntroUser,
                    Admin: result.user.Admin,
                    BankName: result.user.BankName,
                    BankBranch: result.user.BankBranch,
                    BankAccount: result.user.BankAccount,
                    Avatar: result.user.Avatar
                }
            });
        });
    }

    _handleLink() {
        NavigationUtil.goPage({ uid: this.state.userInfoBySearch.Uid }, 'SettingOrganize');
    }

    _onBack() {
        NavigationUtil.goBack(this.props.navigation);
    }

    _forzenUser() {
        let key = Toast.loading('冻结中', 0);
        requestApi.postJson('admin/forzenUser', {
            Uid: this.state.userInfoBySearch.Uid,
            docId: this.state.userInfoBySearch.docId,
            Active: true
        }, {
            authorization: this.props.userInfo.token
        }, result => {

        });
    }

    _updatePlan() {
        let key = Toast.loading('设置中', 0);
        requestApi.postJson('admin/updatePlan', {
            Uid: this.state.userInfoBySearch.Uid,
            docId: this.state.userInfoBySearch.docId,
            CurrentLevel: '9'
        }, {
            authorization: this.props.userInfo.token
        }, result => {

        });
    }

    _manualDeposit() {

    }

    _updateUser() {
        let key = Toast.loading('更新中', 0);
        requestApi.postJson('admin/updateUser', this.state.userInfoBySearch, {
            authorization: this.props.userInfo.token
        }, result => {

        });
    }

    _updateAvatar() {
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
                this.setState({
                    userInfoBySearch: {
                        ...this.state.userInfoBySearch,
                        Avatar: response.uri
                    }
                });
            }
        });
    }

    render() {
        NavigationUtil.navigation = this.props.navigation;

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
            title={'用户管理'}
            style={{ backgroundColor: 'transparent' }}
        />;

        return (
            <ImageBackground style={{ flex: 1, }} source={require('../../static/bg.png')}>
                <SafeAreaView style={{ flex: 1, }}>
                    {navigationBar}
                    <View style={{ width: 336, alignSelf: 'center', }}>
                        <Text style={{ marginTop: 20, color: '#795309', fontSize: 14, fontWeight: 'bold', }}>搜寻用户</Text>
                        <View style={{ marginTop: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: 75, height: 29, backgroundColor: '#fff', borderRadius: 5, }}>
                                <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>手机号码</Text>
                            </View>
                            <View style={{ width: 213, height: 29, backgroundColor: '#fff', borderRadius: 5, }}>
                                <TextInput style={{ width: 213, height: 29, paddingHorizontal: 20, paddingVertical: 5, }} placeholder={'输入关键字'} onChangeText={text => this.setState({ Phone: text })} />
                            </View>
                            <TouchableOpacity onPress={() => this._handleSearch()} style={{ width: 32, height: 29, borderRadius: 5, backgroundColor: '#AC7508', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>确认</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.userInfoBySearch.Name ?
                            <Fragment>
                                <View style={{ marginTop: 20, paddingHorizontal: 5, width: 336, height: 288, backgroundColor: '#fff', borderRadius: 5, alignSelf: 'center', }}>
                                    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                                        <TouchableOpacity onPress={() => this._forzenUser()} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, width: 77, height: 20, backgroundColor: '#AC7508', borderRadius: 5, }}>
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>冻结用户</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._updatePlan()} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, width: 77, height: 20, backgroundColor: '#AC7508', borderRadius: 5, }}>
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>设置为点数商</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._updateUser()} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, width: 77, height: 20, backgroundColor: '#AC7508', borderRadius: 5, }}>
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>协助充值</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => this._manualDeposit()} style={{ justifyContent: 'center', alignItems: 'center', paddingHorizontal: 2, width: 77, height: 20, backgroundColor: '#AC7508', borderRadius: 5, }}>
                                            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold', }}>更新资料</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>用户姓名：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.Name} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>手机号码：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.Phone} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>电子邮箱：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.Email} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>推荐代码：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.IntroCode} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>用户等级：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.CurrentLevelName} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>推荐人数：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.IntroUser.length.toString() + 'USDT'} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>是否管理员：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.IntroUser.Admin ? '是' : '否'} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20, paddingHorizontal: 10, width: 336, height: 147, backgroundColor: '#fff', borderRadius: 5, alignSelf: 'center', }}>
                                    <View style={{ marginTop: 20, height: 25, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>帐户资讯：</Text>
                                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: 202, height: 25, borderRadius: 5, backgroundColor: 'yellow', }}>
                                            <TextInput value={this.state.userInfoBySearch.Name + ',' + this.state.userInfoBySearch.BankName + ',' + this.state.userInfoBySearch.BankBranch + ',' + this.state.userInfoBySearch.BankAccount} autoCapitalize={'none'} style={{ width: 202, paddingHorizontal: 10, }} />
                                        </View>
                                    </View>
                                    <View style={{ marginTop: 10, display: 'flex', flexDirection: 'row', justifyContent: 'space-around', }}>
                                        <Text style={{ color: '#795309', fontSize: 12, fontWeight: 'bold', }}>帐户照片：</Text>
                                        <View style={{ width: 202, height: 77, display: 'flex', flexDirection: 'row', }}>
                                            {
                                                this.state.userInfoBySearch.Avatar ?
                                                    <Image source={{ uri: this.state.userInfoBySearch.Avatar }} style={{ width: 100, height: 77, marginRight: 15, }} />
                                                    :
                                                    null
                                            }
                                            <TouchableOpacity onPress={() => this._updateAvatar()} style={{ width: 90, height: 20, backgroundColor: '#707070', justifyContent: 'center', alignItems: 'center', borderRadius: 5, }}>
                                                <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>上传图片</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={{ marginTop: 20, width: 336, height: 61, alignSelf: 'center', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                                    <View style={{ width: 265, height: 61, backgroundColor: '#fff', borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Text style={{ color: '#BE8E25', fontSize: 16, fontWeight: 'bold', }}>会员用户：{this.state.userInfoBySearch.Name}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this._handleLink()} style={{ width: 58, height: 61, backgroundColor: '#fff', borderRadius: 5, display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                        <Image source={require('../../static/icon_trending_flat.png')} />
                                    </TouchableOpacity>
                                </View>
                            </Fragment>
                            :
                            null
                        }
                    </View>
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

export default connect(mapStateToProps)(UserManagerPage);