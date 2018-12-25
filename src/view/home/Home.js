import React, { Component } from 'react';
import { 
  View,
  Text,
  Button,
  TouchableHighlight,
  Image,
} from 'react-native';
import px from "../../container/px2dr"
import TabBar from '../../container/react-native-tabs-top/index'
import { connect } from 'react-redux'
import * as actions from '../../redux/action'
import { bindActionCreators } from 'redux'
import TitleBar from '../../component/TitleBar'
import SideMenu from 'react-native-side-menu'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      scroe: 0,
      tabsIndex: 0,
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

  render() {
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
            onChange={index => { this.setState({tabsIndex: index}) }} />
          <View>
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
