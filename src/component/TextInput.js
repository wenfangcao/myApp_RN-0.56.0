import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import px2dr from '../container/px2dr';
import Styles from '../style/style'
const { width, height } = Dimensions.get("window")

export default class TextInputComponent extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      state: 1,
      resultStyle: {
        color: '#fff',
      },
      showError: false,
      key: 0,
      txtValue: '',
      showCover: false,
    }
  }

  getValue() {
    return this.state.txtValue
  }

  testRegExp() {
    if (this.props.regExp.test(this.state.txtValue)) {
      this.setState({
        resultStyle: {
          color: '#fff',
        },
        key: Math.random()
      })
      return true
    } else {
      this.setState({
        resultStyle: {
          color: 'rgb(216, 59, 58)',
        },
        key: Math.random()
      })
      return false
    }
  }

  focus(propsFun) {
    this.refs.TextInput.focus()
    this.setState({
      state: 2,
      resultStyle: {
        color: '#fff',
      },
      showCover: true,
    })
    propsFun?propsFun(): ''
  }

  showError(font) {
    this.setState({
      showError: true,
      errorFont: font,
    })
  }

  blur(propsFun) {
    this.refs.TextInput.blur()
    const state = this.state.txtValue == ''?1:3
    console.log(state)
    this.setState({
      state,
      resultStyle: {
        color: '#fff',
      },
      key: Math.random(),
      showCover: false,
    })
    propsFun?propsFun(): ''
  }

  render() {
    const { style, placeholder, label, onBlur, onFocus, keyboardType, onSubmitEditing, secureTextEntry } = this.props
    let css = {}
    let placeholderColor = null
    switch (this.state.state) {
      case 1: 
        css = {
          backgroundColor: '#353c47',
          color: '#585c6c',
        }
        placeholderColor = '#585c6c'
        break
      case 2: 
        css = {
          backgroundColor: '#585c6c',
          color: '#fff',
        }
        placeholderColor = '#fff'
        break
      case 3: 
        css = {
          backgroundColor: '#353c47',
          color: '#fff',
        }
        placeholderColor = '#fff'
    }

    return (
      <View>
        {
          label?
          <Text style={Styles.label}>{label}</Text>
          : null
        }
        <TextInput
          defaultValue={this.props.defaultValue}
          style={[styles.txtInput, css, this.state.resultStyle, style]}
          placeholder = {placeholder}
          placeholderTextColor={placeholderColor}
          onChangeText={text => {
            this.props.onChangeText(text)
          }}
          onFocus={() => this.focus(onFocus)}
          onBlur={() => this.blur(onBlur)}
          key={this.state.key}
          keyboardType={keyboardType}
          onSubmitEditing={onSubmitEditing}
          secureTextEntry={secureTextEntry}
          ref="TextInput"
        ></TextInput>
        {
          this.state.showCover?
          // true?
          <TouchableHighlight onPress={() => this.blur()}>
            <View style={styles.cover}></View>
          </TouchableHighlight>
          : null
        }
        {/* {
          this.state.showError?
          <Text style={styles.errorTitle}>{this.state.errorFont}</Text>
          :null
        } */}
      </View>
    )
  }
}
var styles = StyleSheet.create({
  txtInput: {
    height: px2dr(100),
    // marginLeft: px2dr(75),
    // marginRight: px2dr(75),
    fontSize: px2dr(28),
    borderRadius: 1,
    paddingLeft: px2dr(20),
    paddingRight: px2dr(20),
  },
  errorTitle: {
    color: 'rgb(216, 59, 58)'
  },
  cover: {
    position: 'absolute',
    top: - height,
    left: - width,
    width: width * 2,
    height: height * 2,
    // zIndex: 99,
    backgroundColor: 'transparent'
  },
})

