import React from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Loader,Row,Col,Box,Button,IconCustomButton,Line,IconCustom,showToast,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
//import {TextField} from 'react-native-material-textfield';
import Utils from '../util/utils.js';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Validations from '../util/validations.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';
import * as Collections from '../constants/firebase';
import firestore from '@react-native-firebase/firestore';

class Login extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    email:'',
    password:'',
    emailError:null,
    passwordError:null
  };

  render(){
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.themeDark}
          style={stylesC.header}>
          <Left>
            <BackButton
              onPress={()=>{
                this.props.navigation.goBack();
              }}/>
          </Left>
          <Body>
            <Title style={stylesC.headerTitle}>{Strings.login}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
            <Col center extraStyle={[{paddingHorizontal:30, paddingTop:30, paddingBottom:20}]}>
              <Image
                resizeMode='contain'
                style={{width:100,height:100,tintColor:Colors.iconMedium}}
                source={require('../assets/bio.png')}/>
              <Row extraStyle={[{marginTop:30}]}>
                <Input
                  autoCapitalize='none'
                  ref={(input)=>this.email=input}
                  placeholder={Strings.email}
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='email-address' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({email:text})}
                  value={this.state.email}
                  onSubmitEditing={this.onSubmitEmail}
                  blurOnSubmit={false}/>
              </Row>
              <Row extraStyle={{marginTop:0}}>
                <Input
                  autoCapitalize='none'
                  secureTextEntry
                  value={this.state.password}
                  error={this.state.passwordError}
                  lineWidth={1}
                  inputContainerStyle={[stylesC.fieldP,{marginTop:-10,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  ref={(input)=>this.password=input}
                  placeholder={Strings.password}
                  keyboardType='default'
                  onChangeText={(text)=>this.setState({password:text})}/>
              </Row>
              <TouchableOpacity
                style={{height:40,marginTop:20}}
                activeOpacity={0.6}
                onPress={this.openForgotPassword}>
                <Text style={[stylesC.textD14,{textDecorationLine:'underline'}]}>
                  {Strings.fp}?
                </Text>
              </TouchableOpacity>
              <Button
                label={Strings.login}
                activeOpacity={0.6}
                buttonStyle={[stylesC.buttonR45,{height:50,marginTop:20,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={this.loginUser}/>
              <Button
                label={Strings.signup}
                activeOpacity={0.6}
                buttonStyle={[stylesC.buttonOR45,{height:50,marginTop:15,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonOT16]}
                onPress={this.openSignup}/>
            </Col>
          </ScrollView>
          <Loader
            containerStyle={[stylesC.loader]}
            animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={payload => {
              // onFocus
            }}/>
        </Content>
      </Container>
    );
  }

  loginUser = ()=>{
    if(this.state.email === ''){
      showToast(Strings.er);
      return;
    }
    if(this.state.password === ''){
      showToast(Strings.pr);
      return;
    }

    this.setState({loading:true});
    auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async () => {
        const user = await firestore()
                              .collection(Collections.users)
                              .doc(this.state.email)
                              .get();
        showSuccessToast(Strings.lis);
        this.setState({loading:false});
        MyStorage.setLogin('true');
        MyStorage.setUser(user.data());
        GLOBAL.isLogin = 'true';
        GLOBAL.user = user.data();
        if(GLOBAL.drawer != null)
          GLOBAL.drawer.update();
        this.props.navigation.goBack();
      })
      .catch(error => {
        console.log('error: '+error.code);
        showToast(Strings.utl);
        this.setState({loading:false});
      });
  };

  openForgotPassword = ()=>{
    Utils.moveToScreen(this.props.navigation, 'Home', 'ForgotPassword');
  };

  openSignup = ()=>{
    Utils.moveToScreen(this.props.navigation, 'Home', 'Signup');
  };

  onSubmitEmail = ()=>{
    this.password.focus();
  };

  async componentDidMount(){
    console.log("Login mount");
  }

  onFocus = ()=>{
    console.log("Login focus");
  };

  componentWillUnmount(){
    console.log("Login unmount");
  }
}

export default Login