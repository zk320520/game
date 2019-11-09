import React, { Component } from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { BottomTabBar } from 'react-navigation-tabs';
import { connect } from 'react-redux';

import MainPage from '../pages/Main/MainPage';
import MainStoreValuePage from '../pages/Main/StoreValuePage';
import MainWithdrawPage from '../pages/Main/WithdrawPage';
import MainPayPage from '../pages/Main/PayPage';
import MainPaymentPage from '../pages/Main/PaymentPage';

import BettingPage from '../pages/Betting/BettingPage';
import BetRecordPage from '../pages/Betting/BetRecordPage';


import OrganizePage from '../pages/Organize/OrganizePage';
import OtherMemberPage from '../pages/Organize/OtherMemberPage';

import FinancialPage from '../pages/Financial/FinancialPage';
import FinancialStoreValuePage from '../pages/Financial/StoreValuePage';
import FinancialWithdrawPage from '../pages/Financial/WithdrawPage';
import FinancialPayPage from '../pages/Financial/PayPage';
import FinancialPaymentPage from '../pages/Financial/PayPage';

import SettingPage from '../pages/Setting/SettingPage';
import SafePage from '../pages/Setting/SafePage';
import ServicePage from '../pages/Setting/ServicePage';
import SecretPage from '../pages/Setting/SecretPage';
import LanguagePage from '../pages/Setting/LanguagePage';
import VersionPage from '../pages/Setting/VersionPage';
import ManagerPage from '../pages/Setting/ManagerPage';
import UserManagerPage from '../pages/Setting/UserManagerPage';
import SettingOrganizePage from '../pages/Setting/OrganizePage';
import SettingOtherMemberPage from '../pages/Setting/OtherMemberPage';
import MatchManagerPage from '../pages/Setting/MatchManagerPage';
import SecretManagerPage from '../pages/Setting/SecretManagerPage';
import ServiceManagerPage from '../pages/Setting/ServiceManagerPage';
import LevelManagerPage from '../pages/Setting/LevelManagerPage';
import ExchangeManagerPage from '../pages/Setting/ExchangeManagerPage';
import NewsManagerPage from '../pages/Setting/NewsManagerPage';
import SystemManagerPage from '../pages/Setting/SystemManagerPage';
import PaymentManagerPage from '../pages/Setting/PaymentManagerPage';
import DataManagerPage from '../pages/Setting/DataManagerPage';
import AppManagerPage from '../pages/Setting/AppManagerPage';

let TABS = {
    Main: {
        screen: createStackNavigator({
            Main: {
                screen: MainPage,
            },
            MainStoreValue: {
                screen: MainStoreValuePage,
            },
            MainWithdraw: {
                screen: MainWithdrawPage,
            },
            MainPay: {
                screen: MainPayPage,
            },
            MainPayment: {
                screen: MainPaymentPage
            }
        }),
        navigationOptions: {
            tabBarLabel: '系统主页',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../static/icon_league.png')}
                />
            ),
        }
    },
    Betting: {
        screen: createStackNavigator({
            Betting: {
                screen: BettingPage,
            },
            BetRecord: {
                screen: BetRecordPage,
            }
        }),
        navigationOptions: {
            tabBarLabel: '赛事下注',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../static/icon_matchup.png')}
                />
            ),
        }
    },
    Organize: {
        screen: createStackNavigator({
            Organize: {
                screen: OrganizePage,
            },
            OrganizeOtherMember: {
                screen: OtherMemberPage,
            }
        }),
        navigationOptions: {
            tabBarLabel: '会员组织',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../static/icon_player.png')}
                />
            ),
        }
    },
    Financial: {
        screen: createStackNavigator({
            Financial: {
                screen: FinancialPage,
            },
            FinancialStoreValue: {
                screen: FinancialStoreValuePage,
            },
            FinancialWithdraw: {
                screen: FinancialWithdrawPage,
            },
            FinancialPay: {
                screen: FinancialPayPage,
            },
            FinancialPayment: {
                screen: FinancialPaymentPage
            }
        }),
        navigationOptions: {
            tabBarLabel: '帐务经理',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../static/icon_team.png')}
                />
            ),
        }
    },
    Setting: {
        screen: createStackNavigator({
            Setting: {
                screen: SettingPage,
            },
            Safe: {
                screen: SafePage,
            },
            Service: {
                screen: ServicePage,
            },
            Secret: {
                screen: SecretPage,
            },
            Language: {
                screen: LanguagePage,
            },
            Version: {
                screen: VersionPage,
            },
            Manager: {
                screen: ManagerPage,
            },
            UserManager: {
                screen: UserManagerPage,
            },
            SettingOrganize: {
                screen: SettingOrganizePage,
            },
            SettingOtherMember: {
                screen: SettingOtherMemberPage
            },
            MatchManager: {
                screen: MatchManagerPage,
            },
            SecretManager: {
                screen: SecretManagerPage,
            },
            ServiceManager: {
                screen: ServiceManagerPage,
            },
            LevelManager: {
                screen: LevelManagerPage,
            },
            ExchangeManager: {
                screen: ExchangeManagerPage,
            },
            NewsManager: {
                screen: NewsManagerPage,
            },
            SystemManager: {
                screen: SystemManagerPage,
            },
            PaymentManager: {
                screen: PaymentManagerPage
            },
            DataManager: {
                screen: DataManagerPage
            },
            AppManager: {
                screen: AppManagerPage,
            },
        }),
        navigationOptions: {
            tabBarLabel: '资料设定',
            tabBarIcon: ({ tintColor, focused }) => (
                <Image
                    source={require('../static/icon_setting.png')}
                />
            ),
        }
    },
};


class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
    }

    _tabNavigator() {
        if (this.Tabs) return this.Tabs;
        let { Main, Betting, Organize, Financial, Setting } = TABS;
        let tabs = { Main, Betting, Organize, Financial, Setting };
        let TabNavigator = createBottomTabNavigator(tabs, {
            tabBarComponent: props => (
                <TabBarComponent {...props} />
            ),
            defaultNavigationOptions: ({ navigation }) => ({
                // 隐藏底部栏
                tabBarVisible: navigation.state.index > 0 ? false : true,
            }),
            tabBarOptions: {
                activeTintColor: '#fff',
                inactiveTintColor: '#fff',
                activeBackgroundColor: '#707070',
                style: {
                    backgroundColor: '#191515'
                }
            }
        });
        return this.Tabs = createAppContainer(TabNavigator);
    }

    render() {
        let Tab = this._tabNavigator();
        return (
            <Tab />
        );
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BottomTabBar
                {...this.props}
            />
        );
    }
}

let mapStateToProps = state => ({});

export default connect(mapStateToProps)(DynamicTabNavigator);
