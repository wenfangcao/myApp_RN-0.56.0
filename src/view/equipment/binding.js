import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import Styles from '../../style/style'
import TitleBar from '../../component/TitleBar'
import font from '../../container/font';
import myColor from '../../style/myColor'
import px2dr from '../../container/px2dr';

export default class Register extends Component  {
  constructor() {
    super()
    this.state = {
      img: [
        // require('../../images/equipment/bind@3x.png'),
      ],
    }
  }

  componentWillMount() {
    console.log(myColor)
  }

  render() {
    return (
      <View style={Styles.cell}>
        {/* <TitleBar navigation = {this.props.navigate} title={font.registerTitle}/> */}
        <View style={[Styles.wrapper, Styles.bgc]}>
          {/* <Image source={this.state.img[0]} style={styles.bindImg}/> */}
          <Text style={{color: '#fff'}}>1</Text>
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  bindImg: {
    width: px2dr(300),
    height: px2dr(200),
  },
})