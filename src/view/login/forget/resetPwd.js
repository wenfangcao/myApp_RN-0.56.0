import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native'
import TextInput from '../../../component/TextInput'
import Button from '../../../component/Button'
import Styles from '../../../style/style'
import TitleBar from '../../../component/TitleBar'
import font from '../../../container/font';
import px2dr from '../../../container/px2dr';
import common from '../../../container/common'

export default class resetPwd extends Component  {
  constructor() {
    super()
    this.state = {
      pwd: '',
      rePwd: '',
      errorFont: '',
      showError: false,
      keys: [0,1],
    }
  }

  confirm() {
    if (this.state.pwd != this.state.rePwd) {
      // common.showToast(font.NOT_SAME)
      this.showError(font.NOT_SAME)
      return {}
    }
    this.props.navigation.navigate('login')
  }

  showError(font) {
    this.setState({
      errorFont: font,
      showError: true,
      keys:[
        Math.random(),
        Math.random()
      ]
    })
  }

  hiddenError() {
    if (this.state.showError === false){
      return {}
    }
    this.setState({
      showError: false,
      keys:[
        Math.random(),
        Math.random()
      ]
    })
  }

  focusRePwd() {
    this.refs.input_pwd.blur()
    this.refs.input_rePwd.focus()
  }

  render() {
    let canConfirm = false
    if (this.state.pwd != '' && this.state.rePwd != '') {
      canConfirm = true
    }
    const inputColor = this.state.showError?'#E2534A':'#fff'
    console.log(inputColor)
    return (
      <View style={Styles.cell}>
        <TitleBar navigation = {this.props.navigation}/>
        <View style={Styles.wrapper}>
          <TextInput
            style={{color: inputColor}}
            label={font.NEW_PASSWORD}
            placeholder={font.NEW_PWD_PLACEHOLDER}
            defaultValue={this.state.pwd}
            onChangeText={text => {this.setState({pwd: text})}}
            onFocus={() => this.hiddenError()}
            key={this.state.keys[0]}
            secureTextEntry={true}
            ref="input_pwd"
            onSubmitEditing={() => this.focusRePwd()}
          />
          <TextInput
            style={{color: inputColor}}
            label={font.CONFIRM_PASSWORD}
            placeholder={font.CONFIRM_PWD_PLACEHOLDER}
            defaultValue={this.state.rePwd}
            onChangeText={text => {this.setState({rePwd: text})}}
            onFocus={() => this.hiddenError()}
            key={this.state.keys[1]}
            secureTextEntry={true}
            ref="input_rePwd"
            onSubmitEditing={() => this.confirm()}
          />
          {
            this.state.showError?
            <Text style={{color: '#E2534A', fontSize: px2dr(28), marginTop: px2dr(5)}}>{this.state.errorFont}</Text>
            : null
          }
          <Button
            enable={canConfirm}
            title={font.CONFIRM}
            style={{marginTop: px2dr(120)}}
            onPress={() => this.confirm(0)}
          />
        </View>
      </View>
    )
  }
}
