// complete
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  requireNativeComponent,
  NativeModules,
  TouchableHighlight
} from 'react-native';
import Styles from '../../style/style'
import TitleBar from '../../component/TitleBar'
import font from '../../container/font'
// const CodeView = requireNativeComponent('LWQRCode', null)

export default class QRCode extends Component  {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    console.log(NativeModules)
  }

  showCamera() {
    NativeModules.PushNative.RNOpenOneVC('LWQRCodeViewController')
  }

  render() {
    return (
      <View style={Styles.cell}>
        <Text style={styles.title}>RN界面</Text>
        <TouchableHighlight onPress={() => this.showCamera()}>
          <Text style={styles.title}>打开原生扫码</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
var styles = StyleSheet.create({
title: {
  marginTop: 300,
  textAlign: 'center'
}
})