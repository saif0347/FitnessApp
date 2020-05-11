import React from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Loader,Row,Col,Box,Button,IconCustomButton,Line,IconCustom,showToast,showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
//import {TextField} from 'react-native-material-textfield';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Validations from '../util/validations.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';
import * as Collections from '../constants/firebase';

class Signup extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    name:'',
    email:'',
    password:'',
    cpassword:'',
    emailError:null,
    passwordError:null,
    cpasswordError:'',
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
            <Title style={stylesC.headerTitle}>{Strings.signup}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Col center extraStyle={[{paddingHorizontal:30, paddingTop:30, paddingBottom:20}]}>
              <Image
                resizeMode='contain'
                style={{width:100,height:100, tintColor:Colors.iconMedium}}
                source={require('../assets/bio.png')}/>
              <Input
                ref={(input)=>this.name=input}
                placeholder={Strings.name}
                inputContainerStyle={[stylesC.fieldP,{marginTop:30,marginHorizontal:0}]}
                inputStyle={[stylesC.field]}
                textContentType='none' //Autofill > name,username,emailAddress,password...
                keyboardType='default' //number-pad,decimal-pad,numeric,email-address,phone-pad
                onChangeText={(text)=>this.setState({name:text})}
                value={this.state.name}
                onSubmitEditing={this.onSubmitName}
                blurOnSubmit={false}/>
              <Input
                autoCapitalize='none'
                ref={(input)=>this.email=input}
                placeholder={Strings.email}
                inputContainerStyle={[stylesC.fieldP,{marginTop:-10,marginHorizontal:0}]}
                inputStyle={[stylesC.field]}
                textContentType='none' //Autofill > name,username,emailAddress,password...
                keyboardType='email-address' //number-pad,decimal-pad,numeric,email-address,phone-pad
                onChangeText={(text)=>this.setState({email:text})}
                value={this.state.email}
                onSubmitEditing={this.onSubmitEmail}
                blurOnSubmit={false}/>
              <Input
                autoCapitalize='none'
                secureTextEntry
                value={this.state.password}
                lineWidth={1}
                inputContainerStyle={[stylesC.fieldP,{marginTop:-10,marginHorizontal:0}]}
                inputStyle={[stylesC.field]}
                ref={(input)=>this.password=input}
                placeholder={Strings.password}
                keyboardType='default'
                onChangeText={(text)=>this.setState({password:text})}
                onSubmitEditing={this.onSubmitPassword}
                blurOnSubmit={false}/>
              <Input
                autoCapitalize='none'
                secureTextEntry
                value={this.state.cpassword}
                lineWidth={1}
                inputContainerStyle={[stylesC.fieldP,{marginTop:-10,marginHorizontal:0}]}
                inputStyle={[stylesC.field]}
                ref={(input)=>this.cpassword=input}
                placeholder={Strings.cpassword}
                keyboardType='default'
                onChangeText={(text)=>this.setState({cpassword:text})}/>
              <Button
                label={Strings.signup}
                activeOpacity={0.6}
                buttonStyle={[stylesC.buttonOR45,{height:50,marginTop:15,marginHorizontal:10}]}
                labelStyle={[stylesC.buttonOT16]}
                onPress={this.signupUser}/>
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

  signupUser = ()=>{
    if(this.state.name === ''){
      showToast(Strings.nr);
      return;
    }
    if(this.state.email === ''){
      showToast(Strings.er);
      return;
    }
    if(!Validations.checkEmail(this)){
      showToast(Strings.invalidEmail);
      return;
    }
    if(this.state.password === ''){
      showToast(Strings.pr);
      return;
    }
    if(this.state.cpassword === ''){
      showToast(Strings.cpr);
      return;
    }
    if(this.state.password !== this.state.cpassword){
      showToast(Strings.pm);
      return;
    }

    this.setState({loading:true});
    auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.setState({loading:false});
        // add user
        let user = {
          name: this.state.name,
          email: this.state.email
        };
        firestore()
          .collection(Collections.users)
          .doc(this.state.email)
          .set(user)
          .then(() => {
            console.log('User added!');
            showSuccessToast(Strings.sus);
            MyStorage.setLogin('true');
            MyStorage.setUser(user);
            GLOBAL.user = user;
            GLOBAL.isLogin = 'true';
            if(GLOBAL.drawer != null)
              GLOBAL.drawer.update();
            this.props.navigation.goBack();
          });
      })
      .catch(error => {
        this.setState({loading:false});
        if (error.code === 'auth/email-already-in-use') {
          showToast(Strings.err3);
        }
        if (error.code === 'auth/invalid-email') {
          showToast(Strings.err4);
        }
      });
  };

  onSubmitName = ()=>{
    this.email.focus();
  };

  onSubmitEmail = ()=>{
    this.password.focus();
  };

  onSubmitPassword = ()=>{
    this.cpassword.focus();
  };

  async componentDidMount(){
    console.log("Signup mount");
  }

  onFocus = ()=>{
    console.log("Signup focus");
  };

  componentWillUnmount(){
    console.log("Signup unmount");
  }
}

export default Signup