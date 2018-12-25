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
import TabBar from "react-native-tabs-top"

const TableView = requireNativeComponent('TableView', null)
class Home extends Component {
  constructor() {
    super()
    this.state = {
      scroe: 0,
      tablist:[
        {id:1,name:"tab1"},
        {id:2,name:"tab1"},
        {id:3,name:"tab1"},
        {id:4,name:"tab1"},
        {id:5,name:"tab1"},
        {id:6,name:"tab1"},
        {id:7,name:"tab1"},
        {id:8,name:"tab1"},
        {id:9,name:"tab1"},
        {id:10,name:"tab1"},
        {id:11,name:"tab1"},
        {id:12,name:"tab1"},
      ]
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
          <TabBar ref={e => this.tabs = e}
            index={this.state.index}
            data={this.state.tablist}
            onChange={index => {}} />
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
