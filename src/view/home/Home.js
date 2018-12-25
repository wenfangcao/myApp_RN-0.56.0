import React, { Component } from 'react';
import { 
  View,
  Text,
  Button,
  PushNotificationIOS,
  TouchableHighlight,
  NativeModules,
  requireNativeComponent,
} from 'react-native';
import px from '../../container/px2dr'
import { connect } from 'react-redux'
import * as actions from '../../redux/action'
import { bindActionCreators } from 'redux'
import TitleBar from '../../component/TitleBar'
import common from '../../container/common'
import SideMenu from 'react-native-side-menu'

const TableView = requireNativeComponent('TableView', null)
class Home extends Component {
  constructor() {
    super()
    this.state = {
      scroe: 0
    }
  }

  showNotifi() {
    
    PushNotificationIOS.checkPermissions(res => {
      console.log(res)
      if (res.alert == '0') {
        PushNotificationIOS.requestPermissions()
      }
    })
    PushNotificationIOS.presentLocalNotification({
      alertBody: 'ok',
      applicationIconBadgeNumber: 1
    })
    PushNotificationIOS.scheduleLocalNotification({
      alertTitle: "111",
      alertBody: 'ok',
      fireDate: new Date().getTime() + 1000
    })
    PushNotificationIOS.getScheduledLocalNotifications(res => {
      console.log(res)
    })
  }

  showNSLog() {
    console.log(NativeModules)
    // NativeModules.NSLogModule.test('我我我')
  }

  render() {
    console.log(this.props)
    const menu = <Text style={{marginTop: 22}}>aaa</Text>

    return (

      <SideMenu
        menu={menu}
      > 
      
        <View>
          <TitleBar navigation={this.props.navigation} title="home"></TitleBar>
          <View>
            <Button onPress={() => this.showNotifi()} title="show Notification"></Button>
            <Button onPress={() => this.showNSLog()} title="show NSlog"></Button>
            <Text style={{fontSize: px(30)}}>Home</Text>
            <Text onPress={ () => this.props.dispatch.changeText('212') }>{this.props.value.score}</Text>
            <Text>{this.state.score}</Text>
            {/* <TableView/> */}
          </View>
        </View>
      </SideMenu>
      
    )
  }
}

const mapStateToProps = (state) => {
  return {
    value: state,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch: bindActionCreators(actions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
