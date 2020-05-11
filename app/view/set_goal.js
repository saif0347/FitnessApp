import React from 'react';
import {View,Text,Image,ScrollView,TouchableOpacity,FlatList} from 'react-native';
import {SafeAreaView, StatusBar} from 'react-native';
import {Container,Content,Header,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {BackButton,Loader,Col,Button,showToast,Row,RadioButton,Box,Circle,Line} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import {Input} from 'react-native-elements';
import Utils from '../util/utils.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';

class SetGoal extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    w_gain:true,
    w_loss:false,
    cweight:'',
    tweight:50,
    models:[
        {},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}
    ],
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
                  style={{width:120,height:120, alignSelf:'center',tintColor:Colors.iconMedium}}
                  source={require('../assets/goal.png')}/>
                <Col center extraStyle={[{width:'100%',marginTop:20}]}>
                  <Text style={stylesC.textM16}>
                    {Strings.iwt}:
                  </Text>  
                  <Row center>
                    <RadioButton
                      size={24}
                      checked={this.state.w_gain}
                      checkedColor={Colors.theme}
                      uncheckedColor={Colors.theme}
                      title={Strings.gw}
                      containerStyle={stylesC.checkboxContainerStyle}
                      textStyle={stylesC.checkboxText16}
                      onPress={()=>{
                        this.setState({w_gain:true, w_loss:false});
                      }}/>
                    <RadioButton
                      size={24}
                      checked={this.state.w_loss}
                      checkedColor={Colors.theme}
                      uncheckedColor={Colors.theme}
                      title={Strings.lw}
                      containerStyle={stylesC.checkboxContainerStyle}
                      textStyle={stylesC.checkboxText16}
                      onPress={()=>{
                        this.setState({w_gain:false, w_loss:true});
                      }}/>
                  </Row>
                </Col>
                <Col center extraStyle={[{marginTop:20}]}>
                  <Text style={stylesC.textM16}>
                    {Strings.current} {Strings.weight}
                  </Text>
                  <Text style={stylesC.textD20}>
                    {this.state.cweight} kg
                  </Text>
                </Col>
                <Col center extraStyle={[{marginTop:20}]}>
                  <Text style={stylesC.textM16}>
                    {Strings.target} {Strings.weight}
                  </Text>
                  <View style={{height:120}}>
                    <FlatList
                      ref={(ref) => { this.flatList = ref; }}
                      showsVerticalScrollIndicator={false}
                      horizontal={true}
                      data={this.state.models}
                      initialNumToRender={50}
                      extraData={this.state} // refresh list on state change
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this._renderItem}/>
                  </View>
                </Col>
                <Button
                  label={Strings.submit}
                  activeOpacity={0.6}
                  buttonStyle={[stylesC.button45,{marginTop:20,marginHorizontal:0}]}
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
        {Strings.sg}
      </Text>
    </Row>
    :
    <Row center extraStyle={[{width:'100%',height:55,backgroundColor:Colors.theme,paddingHorizontal:15}]}>
      <Text style={[stylesC.textDB18,{marginLeft:10,color:'white'}]}>
        {Strings.sg}
      </Text>
    </Row>
  };

  _renderItem = ({item,index}) =>{
    //console.log('index: '+index);
    let index_ = index+50;
    return (
        <Box center extraStyle={[{paddingHorizontal:10}]}>
          <Circle
            fill={false}
            shadow={false}
            borderWidth={this.state.tweight==index_? 4 : 2}
            activeOpacity={0.6}
            size={100}
            color={this.state.tweight==index_? Colors.themeDark :  Colors.theme}
            component={
                <Col center>
                    <Text style={[this.state.tweight==index_? stylesC.textD18 : stylesC.textM18, {marginTop:5, color:this.state.tweight==index_? Colors.themeDark :  Colors.theme}]}>
                        {index_} kg
                    </Text>
                </Col>
            }
            onPress={()=>{
              this.setState({tweight:index_});
            }}/>
        </Box>
    );
  };

  submitInfo = ()=>{
    if(this.state.w_gain){
      let cw = parseInt(this.state.cweight);
      if(cw > this.state.tweight){
        showToast(Strings.err1);
        return;
      }
    }
    else{
      let cw = parseInt(this.state.cweight);
      if(cw < this.state.tweight){
        showToast(Strings.err2);
        return;
      }
    }

    if(this.state.w_gain){
      MyStorage.setWeightGoal('gain');
    }
    else {
      MyStorage.setWeightGoal('loss');
    }
    MyStorage.setTargetWeight(this.state.tweight.toString());
    Utils.moveToAnotherStack(this.props.navigation, 'Home');
  };

  loadData = async ()=>{
    let cweight = await MyStorage.getCurrentWeight();
    let tweight = await MyStorage.getTargetWeight();
    let wg = await MyStorage.getWeightGoal();
    if(tweight === ''){
      tweight = '50';
    }
    tweight = parseInt(tweight);

    this.setState({cweight:cweight, tweight:tweight, w_gain: wg==='gain'? true:false, w_loss: wg==='gain'? false:true});
  };

  componentDidMount(){
    console.log("SetGoal mount");
    this.loadData();
    setTimeout(()=>{
      let index = this.state.tweight-50;
      console.log('index: '+index);
      this.flatList.scrollToIndex({animated:true, index: index});
    }, 1000);
  }

  onFocus = ()=>{
    console.log("SetGoal focus");
  };

  componentWillUnmount(){
    console.log("SetGoal unmount");
  }
}

export default SetGoal