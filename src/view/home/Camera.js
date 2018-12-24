// complete
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Styles from '../../style/style'
import TitleBar from '../../component/TitleBar'
import font from '../../container/font';
import { RNCamera } from "react-native-camera"

export default class Camera extends Component  {
  constructor() {
    super()
    this.state = {
      moveAnim: new Animated.Value(0),
    }
  }
  // https://stackoverflow.com/questions/41645340/react-native-camera-cannot-read-property-aspect-of-undefined
  componentDidMount() {
    this.startAnimation()
  }

  startAnimation = () => {
    this.state.moveAnim.setValue(0)
    Animated.timing(
      this.state.moveAnim,
      {
        toValue: -200,
        duration: 1500,
        easing: Easing.linear
      }
    ).start(() => this.startAnimation())
  }

  onBarCodeRead = (result) => {
    // const { navigate } = this.props.navigation;
    const {data} = result; //只要拿到data就可以了
    console.log(data)
    //     //路由跳转到webView页面；
    // navigate('Sale', { 
    //     url: data
    // })
  }

  render() {
    return (
      <View style={Styles.cell}>
        <TitleBar navigation = {this.props.navigate} title={font.registerTitle}/>
        <View style={Styles.wrapper}>
          <RNCamera
            ref={ref => {
              this.camera = ref
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            onBarCodeRead={this.onBarCodeRead}
            >  
              <View style={styles.rectangleContainer}>
                <View style={styles.rectangle}/>
                <Animated.View style={[
                    styles.border,
                    {transform: [{translateY: this.state.moveAnim}]}]}/>
                <Text style={styles.rectangleText}>将二维码放入框内，即可自动扫描</Text>
              </View>
          </RNCamera>
        </View>
      </View>
    )
  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
  },
  rectangleContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
  },
  rectangle: {
      height: 200,
      width: 200,
      borderWidth: 1,
      borderColor: '#00FF00',
      backgroundColor: 'transparent'
  },
  rectangleText: {
      flex: 0,
      color: '#fff',
      marginTop: 10
  },
  border: {
      flex: 0,
      width: 200,
      height: 2,
      backgroundColor: '#00FF00',
  }
})