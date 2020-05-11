import React from 'react';
import {Text,Image,ScrollView,TouchableOpacity} from 'react-native';
import {SafeAreaView, View, StatusBar} from 'react-native';
import {Container,Content,Header,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton, Loader,Col,Button,showToast,Row,RadioButton,Box} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import {Input} from 'react-native-elements';
import Utils from '../util/utils.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';

class UserInfo extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    male:false,
    female:false,
    age:'',
    height:'',
    weight:''
  };

  render(){
    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View 
            style={{
              flex: 1,
              backgroundColor: "#fff",
              paddingTop: Platform.OS === "android" ? 0 : 0
            }}>
        <StatusBar backgroundColor={Colors.themeDark} barStyle="default" />
        <Col style={[stylesC.mainWithLoader]}>
          {this.showTitleBar()}
          <ScrollView contentContainerStyle={{flexGrow:1}}>
            <Col center extraStyle={[{paddingHorizontal:20, paddingTop:20, paddingBottom:20}]}>
              <Card style={{width:'100%',padding:10}}>
                <Image
                  resizeMode='contain'
                  style={{width:120,height:120,alignSelf:'center',tintColor:Colors.iconMedium}}
                  source={require('../assets/bio.png')}/>
                <Col extraStyle={[{width:'100%',marginTop:20}]}>
                  <Row center>
                    <RadioButton
                      size={24}
                      checked={this.state.male}
                      checkedColor={Colors.theme}
                      uncheckedColor={Colors.theme}
                      title={Strings.male}
                      containerStyle={stylesC.checkboxContainerStyle}
                      textStyle={stylesC.checkboxText16}
                      onPress={()=>{
                        this.setState({male:true, female:false});
                      }}/>
                    <RadioButton
                      size={24}
                      checked={this.state.female}
                      checkedColor={Colors.theme}
                      uncheckedColor={Colors.theme}
                      title={Strings.female}
                      containerStyle={stylesC.checkboxContainerStyle}
                      textStyle={stylesC.checkboxText16}
                      onPress={()=>{
                        this.setState({male:false, female:true});
                      }}/>
                  </Row>
                </Col>
                <Row extraStyle={[{marginTop:30, marginBottom:20, marginHorizontal:40}]}>
                  <Col center extraStyle={[{width:60}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.age}
                    </Text>
                  </Col>
                  <Col center extraStyle={[{width:150}]}>
                    <Input
                      ref={(input)=>this.age=input}
                      inputContainerStyle={[stylesC.fieldP,{width:150,marginHorizontal:0,marginBottom:-30}]}
                      inputStyle={[stylesC.field]}
                      autoCapitalize='none'
                      textContentType='none' //Autofill > name,username,emailAddress,password...
                      keyboardType='number-pad' //number-pad,decimal-pad,numeric,email-address,phone-pad
                      onChangeText={(text)=>this.setState({age:text})}
                      value={this.state.age}
                      onSubmitEditing={()=>this.height.focus()}
                      blurOnSubmit={false}/>
                  </Col>
                  <Col center extraStyle={[{marginLeft:20}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.years}
                    </Text>
                  </Col>
                </Row>
                <Row extraStyle={[{marginTop:0, marginBottom:20, marginHorizontal:40}]}>
                  <Col center extraStyle={[{width:60}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.height}
                    </Text>
                  </Col>
                  <Col center extraStyle={[{width:150}]}>
                    <Input
                      ref={(input)=>this.height=input}
                      inputContainerStyle={[stylesC.fieldP,{width:150,marginHorizontal:0,marginBottom:-30}]}
                      inputStyle={[stylesC.field]}
                      autoCapitalize='none'
                      textContentType='none' //Autofill > name,username,emailAddress,password...
                      keyboardType='number-pad' //number-pad,decimal-pad,numeric,email-address,phone-pad
                      onChangeText={(text)=>this.setState({height:text})}
                      value={this.state.height}
                      onSubmitEditing={()=>this.weight.focus()}
                      blurOnSubmit={false}/>
                  </Col>
                  <Col center extraStyle={[{marginLeft:20}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.inches}
                    </Text>
                  </Col>
                </Row>
                <Row extraStyle={[{marginTop:0, marginBottom:20, marginHorizontal:40}]}>
                  <Col center extraStyle={[{width:60}]}>
                    <Text style={stylesC.textD16}>
                      {Strings.weight}
                    </Text>
                  </Col>
                  <Col center extraStyle={[{width:150}]}>
                    <Input
                      ref={(input)=>this.weight=input}
                      inputContainerStyle={[stylesC.fieldP,{width:150,marginHorizontal:0,marginBottom:-30}]}
                      inputStyle={[stylesC.field]}
                      autoCapitalize='none'
                      textContentType='none' //Autofill > name,username,emailAddress,password...
                      keyboardType='number-pad' //number-pad,decimal-pad,numeric,email-address,phone-pad
                      onChangeText={(text)=>this.setState({weight:text})}
                      value={this.state.weight}/>
                  </Col>
                  <Col center extraStyle={[{marginLeft:20}]}>
                    <Text style={stylesC.textD16}>
                      kg
                    </Text>
                  </Col>
                </Row>
                
                <Button
                  label={Strings.submit}
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:0,marginHorizontal:0}]}
                  labelStyle={[stylesC.buttonT16]}
                  onPress={this.submitInfo}/>
              </Card>
            </Col>
          </ScrollView>
          <Loader
            containerStyle={[stylesC.loader]}
            animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={() => {
              // onFocus
            }}/>
        </Col>
        </View>
      </SafeAreaView>
    );
  }

  showTitleBar = ()=>{
    return GLOBAL.user_info?
    <Row extraStyle={[{width:'100%',height:55,backgroundColor:Colors.theme,paddingHorizontal:15}]}>
      <BackButton
        onPress={()=>{
          Utils.moveToAnotherStack(this.props.navigation, 'Home')
        }}/>
      <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
        {Strings.mb}
      </Text>
    </Row>
    :
    <Row center extraStyle={[{width:'100%',height:55,backgroundColor:Colors.theme,paddingHorizontal:15}]}>
      <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
        {Strings.mb}
      </Text>
    </Row>
  };

  submitInfo = async () => {
    if(this.state.age === ''){
      showToast(Strings.ar);
      return;
    }
    if(this.state.weight === ''){
      showToast(Strings.wr);
      return;
    }
    if(this.state.height === ''){
      showToast(Strings.hr);
      return;
    }

    if(this.state.male){
      MyStorage.setGender('male');
    }
    else{
      MyStorage.setGender('female');
    }
    MyStorage.setAge(this.state.age);

    let sw = await MyStorage.getStartWeight();
    if(sw === '')
      MyStorage.setStartWeight(this.state.weight);

    MyStorage.setCurrentWeight(this.state.weight);
    MyStorage.setHeight(this.state.height);

    if(GLOBAL.user_info)
      Utils.moveToAnotherStack(this.props.navigation, 'Home')
    else
      Utils.moveToScreen(this.props.navigation, 'Info', 'SetGoal');
  };

  loadData = async ()=>{
    let gender = await MyStorage.getGender();
    let age = await MyStorage.getAge();
    let weight = await MyStorage.getCurrentWeight();
    let height = await MyStorage.getHeight();

    let male = true;
    let female = false;
    if(gender === 'male'){
      male = true;
      female = false;
    }
    else{
      male = false; 
      female = true;
    }

    this.setState({male:male, female:female, age:age, weight:weight, height:height});
  };

  componentDidMount(){
    let from = this.props.navigation.getParam('from');
    console.log('from: '+from);

    this.loadData();
    setTimeout(()=>{
      this.setState({waiting:false});
    }, 200);
  }

  onFocus = ()=>{
    console.log("UserInfo focus");
  };

  componentWillUnmount(){
    console.log("UserInfo unmount");
  }
}

export default UserInfo