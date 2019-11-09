import React, { Component } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { Carousel } from '@ant-design/react-native';
import PropTypes from 'prop-types';

export default class MatchCarousel extends Component {
    static propTypes = {
        gameList: PropTypes.array
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Carousel
                dots={false}
                infinite={this.props.gameList.length > 1}
                autoplay={true}
            >
                {
                    this.props.gameList.map(item => {
                        return (
                            <View key={item.gameID} style={{ width: Dimensions.get('window').width, height: 49, display: 'flex', backgroundColor: '#191515', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                                <Image style={{ width: 20, height: 34, }} source={require('../static/icon_Guardians_sub.png')} />
                                <Text style={{ color: '#E7E2E1', fontSize: 10 }}>{item.homeName}</Text>
                                <Text style={{ color: '#fff', fontSize: 22 }}>{item.homeScore}</Text>
                                <View style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                                    <Text style={{ color: '#fff', fontSize: 10 }}>{item.status == '未開賽' ? '同步赛事' : item.status == '比賽中' ? '即时赛事' : '结束赛事'}</Text>
                                    <Text style={{ color: '#fff', fontSize: 16 }}>VS</Text>
                                </View>
                                <Text style={{ color: '#fff', fontSize: 22 }}>{item.awayScore}</Text>
                                <Text style={{ color: '#E7E2E1', fontSize: 10 }}>{item.awayName}</Text>
                                <Image style={{ width: 20, height: 34, }} source={require('../static/icon_Guardians_sub.png')} />
                            </View>
                        );
                    })
                }
            </Carousel>
        );
    }
}