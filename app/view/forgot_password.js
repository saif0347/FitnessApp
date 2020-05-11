import React from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Loader,Row,Col,Box,Button,IconCustomButton,Line,IconCustom,showToast, showSuccessToast} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
//import {TextField} from 'react-native-material-textfield';
import {Input} from 'react-native-elements';
import auth from '@react-native-firebase/auth';

class ForgotPassword extends React.Component {
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
    emailError:null
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
            <Title style={stylesC.headerTitle}>{Strings.fp}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <ScrollView contentContainerStyle={{flexGrow:1,justifyContent:'center'}}>
            <Col center extraStyle={[{paddingHorizontal:30, paddingTop:30, paddingBottom:20}]}>
              <Image
                resizeMode='contain'
                style={{width:100,height:100}}
                source={require('../assets/logo.png')}/>
              <Row extraStyle={[{marginTop:30}]}>
                <Input
                  ref={(input)=>this.email=input}
                  placeholder={Strings.email}
                  inputContainerStyle={[stylesC.fieldP,{marginTop:0,marginHorizontal:0}]}
                  inputStyle={[stylesC.field]}
                  textContentType='none' //Autofill > name,username,emailAddress,password...
                  keyboardType='email-address' //number-pad,decimal-pad,numeric,email-address,phone-pad
                  onChangeText={(text)=>this.setState({email:text})}
                  value={this.state.email}/>
              </Row>
              <Button
                label={Strings.submit}
                activeOpacity={0.6}
                buttonStyle={[stylesC.buttonR45,{height:50,marginTop:20,marginHorizontal:0}]}
                labelStyle={[stylesC.buttonT16]}
                onPress={this.submit}/>
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

  submit = ()=>{
    if(this.state.email === ''){
      showToast(Strings.er);
      return;
    }
    this.setState({loading:true});
    auth().sendPasswordResetEmail(this.state.email)
      .then(() => {
        this.setState({loading:false});
        showSuccessToast(Strings.es);
      })
      .catch(error => {
        this.setState({loading:false});
        showToast(Strings.rf);
        console.log('error: '+error.code);
      });
  };

  async componentDidMount(){
    console.log("ForgotPassword mount");
  }

  onFocus = ()=>{
    console.log("ForgotPassword focus");
  };

  componentWillUnmount(){
    console.log("ForgotPassword unmount");
  }
}

export default ForgotPassword