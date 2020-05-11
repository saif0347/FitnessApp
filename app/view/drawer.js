import React from 'react';
import {View,Text,Image,ScrollView} from 'react-native';
import {Container,Content} from 'native-base';
import * as Colors from '../constants/colors.js';
import {stylesC} from '../styles/style_common.js';
import {IconButton,Row,Col,Box,ListItem,Start,Center,MIcon,Button} from '../custom/components.js';
import {StackActions, NavigationActions} from 'react-navigation';
import Utils from '../util/utils.js';
import GLOBAL from '../constants/global.js';
import MyStorage from '../storage/storage.js';
import AppStrings from '../constants/strings.js';

class NavDrawer extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  update = ()=>{
    this.setState({update:true});
  }

  render(){
    GLOBAL.drawer = this;
    return (
      <Container>
        <Content contentContainerStyle={[stylesC.mainNoPadding,{backgroundColor:'white'}]}>
          <ScrollView>
            <Col style={[stylesC.main,{paddingHorizontal:0,backgroundColor:'white'}]}>
              <Col style={[stylesC.drawerHeader]}>
                <Image
                  resizeMode='contain'
                  style={[{width:120,height:120}]}
                  source={require('../assets/logo.png')}/>
                <Text style={stylesC.textD16}>
                  {Strings.version} 1.0
                </Text>
                {GLOBAL.isLogin === 'true'?
                  <Row center extraStyle={[{marginTop:15}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.hello}, {GLOBAL.user != null? GLOBAL.user.name : ''}
                    </Text>
                  </Row>
                  :
                  <Row center extraStyle={[{marginTop:15}]}>
                    <Button
                      label={Strings.login}
                      activeOpacity={0.6}
                      buttonStyle={[stylesC.buttonO45,{height:40,width:100,marginTop:0,marginHorizontal:0}]}
                      labelStyle={[stylesC.buttonOT16]}
                      onPress={()=>{
                        this.props.navigation.toggleDrawer();
                        Utils.moveToScreen(this.props.navigation, 'Home', 'Login');
                      }}/>
                    <Button
                      label={Strings.signup}
                      activeOpacity={0.6}
                      buttonStyle={[stylesC.buttonO45,{height:40,width:100,marginTop:0,marginHorizontal:0,marginLeft:10}]}
                      labelStyle={[stylesC.buttonOT16]}
                      onPress={()=>{
                        this.props.navigation.toggleDrawer();
                        Utils.moveToScreen(this.props.navigation, 'Home', 'Signup');
                      }}/>
                  </Row>
                }
                
              </Col>
              <ListItem
                containerStyle={[stylesC.menuItemP,{marginTop:5}]}
                activeOpacity={0.6}
                parentStyle={[stylesC.menuItem,{padding:0}]}
                lineStyle={[stylesC.lineHL]}
                onPress={()=>{
                  this.props.navigation.toggleDrawer();
                  Utils.moveToScreen(this.props.navigation, 'Info', 'SetGoal');
                }}>
                <Start style={[stylesC.menuLeft]}>
                  <Image
                    resizeMode='contain'
                    style={{width:28,height:28, alignSelf:'center', tintColor:Colors.iconMedium}}
                    source={require('../assets/goal.png')}/>
                </Start>
                <Center style={[stylesC.menuCenter]}>
                  <Text style={stylesC.textD16}>
                    {Strings.wg}
                  </Text>
                </Center>
              </ListItem>
              <ListItem
                containerStyle={[stylesC.menuItemP]}
                activeOpacity={0.6}
                parentStyle={[stylesC.menuItem,{padding:0}]}
                lineStyle={[stylesC.lineHL]}
                onPress={()=>{
                  this.props.navigation.toggleDrawer();
                  Utils.moveToScreen(this.props.navigation, 'Info', 'UserInfo');
                }}>
                <Start style={[stylesC.menuLeft]}>
                  <Image
                    resizeMode='contain'
                    style={{width:28,height:28, alignSelf:'center', tintColor:Colors.iconMedium}}
                    source={require('../assets/bio.png')}/>
                </Start>
                <Center style={[stylesC.menuCenter]}>
                  <Text style={stylesC.textD16}>
                    {Strings.eb}
                  </Text>
                </Center>
              </ListItem>
              <ListItem
                containerStyle={[stylesC.menuItemP]}
                activeOpacity={0.6}
                parentStyle={[stylesC.menuItem,{padding:0}]}
                lineStyle={[stylesC.lineHL]}
                onPress={()=>{
                  this.props.navigation.toggleDrawer();
                  Utils.moveToScreen(this.props.navigation, 'Home', 'MealPlans');
                }}>
                <Start style={[stylesC.menuLeft]}>
                  <Image
                    resizeMode='contain'
                    style={{width:28,height:28, alignSelf:'center', tintColor:Colors.iconMedium}}
                    source={require('../assets/meal.png')}/>
                </Start>
                <Center style={[stylesC.menuCenter]}>
                  <Text style={stylesC.textD16}>
                    {Strings.mp}
                  </Text>
                </Center>
              </ListItem>
              <ListItem
                containerStyle={[stylesC.menuItemP]}
                activeOpacity={0.6}
                parentStyle={[stylesC.menuItem,{padding:0}]}
                lineStyle={[stylesC.lineHL]}
                onPress={()=>{
                  this.props.navigation.toggleDrawer();
                  Utils.moveToScreen(this.props.navigation, 'Home', 'Articles');
                }}>
                <Start style={[stylesC.menuLeft]}>
                  <Image
                    resizeMode='contain'
                    style={{width:28,height:28, alignSelf:'center', tintColor:Colors.iconMedium}}
                    source={require('../assets/health.png')}/>
                </Start>
                <Center style={[stylesC.menuCenter]}>
                  <Text style={stylesC.textD16}>
                    {Strings.ht}
                  </Text>
                </Center>
              </ListItem>
              <ListItem
                containerStyle={[stylesC.menuItemP]}
                activeOpacity={0.6}
                parentStyle={[stylesC.menuItem,{padding:0}]}
                lineStyle={[stylesC.lineHL]}
                onPress={()=>{
                  this.props.navigation.toggleDrawer();
                  Utils.moveToScreen(this.props.navigation, 'Home', 'ContactUs');
                }}>
                <Start style={[stylesC.menuLeft]}>
                  <Image
                    resizeMode='contain'
                    style={{width:26,height:26, alignSelf:'center', tintColor:Colors.iconMedium}}
                    source={require('../assets/phone.png')}/>
                </Start>
                <Center style={[stylesC.menuCenter]}>
                  <Text style={stylesC.textD16}>
                    {Strings.contact_us}
                  </Text>
                </Center>
              </ListItem>
              {GLOBAL.isLogin === 'true'?
                <ListItem
                  containerStyle={[stylesC.menuItemP]}
                  activeOpacity={0.6}
                  parentStyle={[stylesC.menuItem,{padding:0}]}
                  lineStyle={[stylesC.lineHL]}
                  onPress={()=>{
                    // logout user
                    this.props.navigation.toggleDrawer();
                    MyStorage.setLogin('false');
                    GLOBAL.isLogin = 'false';
                    if(GLOBAL.drawer != null)
                      GLOBAL.drawer.update();
                  }}>
                  <Start style={[stylesC.menuLeft]}>
                    <Image
                      resizeMode='contain'
                      style={{width:26,height:26, alignSelf:'center', tintColor:Colors.iconMedium}}
                      source={require('../assets/logout.png')}/>
                  </Start>
                  <Center style={[stylesC.menuCenter]}>
                    <Text style={stylesC.textD16}>
                      {Strings.logout}
                    </Text>
                  </Center>
                </ListItem>
                :
                null
              }
            </Col>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

export default NavDrawer
