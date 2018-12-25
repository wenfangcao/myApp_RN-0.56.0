// complete
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Image,
} from 'react-native';
import Styles from '../style/style'
import TitleBar from './TitleBar'
import font from '../container/font';
import { RNCamera } from "react-native-camera"
import ImagePicker from 'react-native-image-picker'

export default class Camera extends Component  {
  constructor() {
    super()
    this.state = {
      moveAnim: new Animated.Value(0),
      avatarSource: null,
    }
  }
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

  selectPhotoTapped() {
    const options = {
        title: '选择图片', 
        cancelButtonTitle: '取消',
        takePhotoButtonTitle: '拍照', 
        chooseFromLibraryButtonTitle: '选择照片', 
        customButtons: [
            {name: 'fb', title: 'Choose Photo from Facebook'},
          ],
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

            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };

            this.setState({
                avatarSource: source
            });
        }
    });
  }

  render() {
    return (
      <View style={Styles.cell}>
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
              <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
              <View style={[styles.avatar, styles.avatarContainer, {marginBottom: 30}]}>
                { this.state.avatarSource === null ? <Text>选择照片</Text> :
                  <Image style={styles.avatar} source={this.state.avatarSource} />
                }
              </View>
            </TouchableOpacity>
            </View>
            
        </RNCamera>
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