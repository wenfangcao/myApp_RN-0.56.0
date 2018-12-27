// complete
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  WebView,
} from 'react-native';
import Styles from '../../style/style'
import TitleBar from '../../component/TitleBar'
import font from '../../container/font';

export default class HtmlView extends Component  {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <View style={Styles.cell}>
        <TitleBar navigation = {this.props.navigate} title={font.registerTitle}/>
        <WebView source={{uri: 'https://www.baidu.com'}}/>
      </View>
    )
  }
}
var styles = StyleSheet.create({

})