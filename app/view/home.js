import React from 'react';
import {View,Text,FlatList,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {MenuButton,IconButton,Loader,Row,Col,Box,Line} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Utils from '../util/utils.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';
import firestore from '@react-native-firebase/firestore';
import * as Collections from '../constants/firebase';

class Home extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
    this.state = {
      loading:false,
      goalProgress:0,
      sw:0,
      cw:0,
      tw:0,
      models:[
        {type:Strings.breakfast, color:'green',detail:Strings.loading},
        {type:Strings.lunch, color:'red',detail:Strings.loading},
        {type:Strings.snacks, color:'blue',detail:Strings.loading},
        {type:Strings.dinner, color:'orange',detail:Strings.loading}
      ]
    }
  }

  render(){
    let diff = this.state.tw - this.state.cw;
    if(diff < 0){
      diff = diff * (-1);
    }
    return (
      <Container>
        <Header
          androidStatusBarColor={Colors.themeDark}
          style={stylesC.header}>
          <Left>
            <MenuButton
              onPress={()=>{
                this.props.navigation.toggleDrawer(null);
              }}/>
          </Left>
          <Body>
            <Title style={stylesC.headerTitle}>{Strings.home}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main,{backgroundColor:'white'}]}>
            <ScrollView>
            <Col extraStyle={[{padding:10}]}>
              <Card style={{width:'100%',padding:0}}>
                <Row middleLeft extraStyle={[{width:'100%',height:55,backgroundColor:Colors.lightGray}]}>
                  <Image
                    resizeMode='contain'
                    style={{marginTop:-3,marginLeft:15,width:26,height:26,alignSelf:'center',tintColor:Colors.theme}}
                    source={require('../assets/goal.png')}/>
                  <Text style={[stylesC.textD16,{color:Colors.themeDark,marginLeft:10}]}>
                    {Strings.gp}
                  </Text>
                  <Col middleRight extraStyle={[{flex:1}]}>
                    <TouchableOpacity
                      style={{marginRight:15}}
                      activeOpacity={0.3}
                      onPress={()=>{
                        Utils.moveToScreen(this.props.navigation, 'Info', 'UserInfo');
                      }}>
                      <Row>
                        <Image
                          resizeMode='contain'
                          style={{marginTop:-3,marginRight:5,width:20,height:20,alignSelf:'center',tintColor:Colors.blue}}
                          source={require('../assets/pencil.png')}/>
                        <Text style={[stylesC.textD16,{color:'blue'}]}>
                          {Strings.weight}
                        </Text>
                      </Row>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Col>
                  <Col extraStyle={{marginTop:15}}>
                    <Col center>
                      <AnimatedCircularProgress
                        size={130}
                        width={15}
                        fill={this.state.goalProgress}
                        tintColor={Colors.theme}
                        onAnimationComplete={() => console.log('onAnimationComplete')}
                        backgroundColor={Colors.lightGray}>
                        {
                          (fill) => (
                            <Text style={[stylesC.textDB18,{color:Colors.themeDark}]}>
                              {Utils.round(this.state.goalProgress,0)}%
                            </Text>
                          )
                        }
                      </AnimatedCircularProgress>
                    </Col>
                    {this.state.goalProgress < 100?
                      <Col center extraStyle={[{marginTop:10}]}>
                        <Text style={stylesC.textM16}>
                          {diff} kg {Strings.rem}
                        </Text>
                      </Col>
                      :
                      <Col center extraStyle={[{marginTop:10}]}>
                        <Text style={[stylesC.textM16,{color:Colors.green}]}>
                          {Strings.gc}
                        </Text>
                      </Col>
                    }

                  </Col>
                  <Row extraStyle={[{marginTop:5, padding:12}]}>
                    <Col center extraStyle={[{borderWidth:1,padding:5,borderRadius:5,borderColor:Colors.green,flex:1}]}>
                      <Text style={[stylesC.textD14,{color:Colors.green}]}>
                        {Strings.start}
                      </Text>
                      <Text style={[stylesC.textDB16,{color:Colors.green}]}>
                        {this.state.sw} kg
                      </Text>
                    </Col>
                    <Col center extraStyle={[{marginLeft:10,borderWidth:1,padding:5,borderRadius:5,borderColor:Colors.theme,flex:1}]}>
                      <Text style={[stylesC.textD14,{color:Colors.theme}]}>
                        {Strings.current}
                      </Text>
                      <Text style={[stylesC.textDB16,{color:Colors.theme}]}>
                        {this.state.cw} kg
                      </Text>
                    </Col>
                    <Col center extraStyle={[{marginLeft:10,borderWidth:1,padding:5,borderRadius:5,borderColor:Colors.blue,flex:1}]}>
                      <Text style={[stylesC.textM14,{color:Colors.blue}]}>
                        {Strings.target}
                      </Text>
                      <Text style={[stylesC.textDB16,{color:Colors.blue}]}>
                        {this.state.tw} kg
                      </Text>
                    </Col>
                  </Row>
                </Col>
              </Card>
            </Col>
            <Col extraStyle={[{padding:10,marginTop:-10}]}>
              <Card style={{width:'100%'}}>
                <Row extraStyle={[{width:'100%',height:55,backgroundColor:Colors.lightGray}]}>
                  <Image
                    resizeMode='contain'
                    style={{marginTop:-3,marginLeft:15,width:26,height:26,alignSelf:'center',tintColor:Colors.theme}}
                    source={require('../assets/meal.png')}/>
                  <Text style={[stylesC.textD16,{color:Colors.themeDark,marginTop:2,marginLeft:10}]}>
                    {Strings.tmp}
                  </Text>
                  <Col middleRight extraStyle={[{flex:1}]}>
                    <TouchableOpacity
                      style={{marginRight:15}}
                      activeOpacity={0.3}
                      onPress={()=>{
                        Utils.moveToScreen(this.props.navigation, 'Home', 'MealPlans');
                      }}>
                      <Text style={[stylesC.textD16,{color:'blue'}]}>
                        {Strings.va}
                      </Text>
                    </TouchableOpacity>
                  </Col>
                </Row>
                <Col extraStyle={[{wdith:'100%'}]}>
                  <View style={{width:'100%'}}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      horizontal={false}
                      data={this.state.models}
                      extraData={this.state} // refresh list on state change
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={this._renderItem}/>
                  </View>
                </Col>
              </Card>
            </Col>
            </ScrollView>
          </Col>
          <Loader
            containerStyle={[stylesC.loader]}
            animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={payload => {
              this.onFocus();
            }}/>
        </Content>
      </Container>
    );
  }

  _renderItem = ({item}) =>{
    return (
      <Col extraStyle={[{width:'100%'}]}>
        <Col extraStyle={[{flex:1, padding:10}]}>
          <Row>
            <View
              style={{width:15,height:15,backgroundColor:item.color}}/>
            <Text style={[stylesC.textMB16,{marginLeft:10}]}>
              {item.type}
            </Text>
          </Row>
          <Text style={[stylesC.textM14]}>
            {item.detail}
          </Text>
        </Col>
        <Line
            style={[stylesC.lineHM,{backgroundColor:Colors.lightGray}]}/>
      </Col>
    );
  };

  loadGoalProgress = async ()=>{
    let sw = await MyStorage.getStartWeight();
    let cw = await MyStorage.getCurrentWeight();
    let tw = await MyStorage.getTargetWeight();
    let wg = await MyStorage.getWeightGoal();

    if(sw === '')
      sw = '0';
    if(cw === '')
      cw = '0';
    if(tw === '')
      tw = '0';

    sw = parseInt(sw);
    cw = parseInt(cw);
    tw = parseInt(tw);
    let progress = 0;

    if(wg === 'gain'){
      let a = tw - sw;
      let b = cw - sw;
      progress = b/a * 100;
    }
    else{
      let a = sw - tw;10
      let b = sw - cw;12
      progress = b/a * 100;
    }

    this.setState({
      sw: sw,
      cw: cw,
      tw: tw,
      goalProgress: progress
    });
  };

  loadMealPlan = async ()=>{
    let wg = await MyStorage.getWeightGoal();
    let col = '';
    if(wg === 'gain'){
      col = Collections.weight_gain_meal;
    }
    else{
      col = Collections.weight_loss_meal;
    }
    const plans = await firestore()
      .collection(col)
      .orderBy('id', 'asc')
      .get();

    let date = new Date();
    let today = date.getDay();
    plans.forEach(doc => {
      let data = doc.data();
      if(today === parseInt(data.id)){
        this.setState({
          models:[
            {type:Strings.breakfast, color:'green', detail: data.b},
            {type:Strings.lunch, color:'red', detail: data.l},
            {type:Strings.snacks, color:'blue', detail: data.s},
            {type:Strings.dinner, color:'orange', detail: data.d}
          ]
        });
        //break;
      }
    });
    
    this.setState({loading:false});  
  };

  async componentDidMount(){
    console.log("Home mount");
    GLOBAL.user_info = true;
  }

  onFocus = async ()=>{
    this.loadGoalProgress();
    this.loadMealPlan();
  };

}

export default Home