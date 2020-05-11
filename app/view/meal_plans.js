import React from 'react';
import {View,Text,SectionList,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {IconButton,Loader,Row,Col,Box,Line, BackButton} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import MyStorage from '../storage/storage.js';
import * as Collections from '../constants/firebase';

class MealPlans extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:true,
    models:[]
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
            <Title style={stylesC.headerTitle}>{Strings.mp}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main,{backgroundColor:'white'}]}>
            
            <View style={{marginTop:0,width:'100%',padding:0}}>
              <SectionList
                sections={this.state.models}
                keyExtractor={(item, index) => index.toString()}
                renderSectionHeader={({section}) => (
                  <Row extraStyle={[{width:'100%',height:55,backgroundColor:Colors.lightGray}]}>
                    <Image
                      resizeMode='contain'
                      style={{marginTop:-3,marginLeft:15,width:26,height:26,alignSelf:'center',tintColor:Colors.theme}}
                      source={require('../assets/meal.png')}/>
                    <Text style={[stylesC.textD16,{color:Colors.themeDark,marginTop:2,marginLeft:10}]}>
                      {section.day}
                    </Text>
                    {section.today?
                        <Col middleRight extraStyle={[{flex:1}]}>
                            <Text style={[stylesC.textD16,{color:'blue',marginRight:15}]}>
                              {Strings.today}
                            </Text>
                        </Col>
                        :
                        null
                    }
                  </Row>
                )}
                renderItem={this._renderItem}/>
            </View>
          </Col>
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

  _renderItem = ({item}) =>{
    return (
      <Col extraStyle={[{width:'100%'}]}>
        <Col extraStyle={[{flex:1, paddingHorizontal:15,paddingVertical:10}]}>
          <Row>
            <Col middleLeft extraStyle={[{width:100}]}>
              <Text style={[stylesC.textMB16,{marginLeft:10}]}>
                {item.type}
              </Text>
            </Col>
            <View
              style={{width:5,height:40,backgroundColor:item.color}}/>
            <Col middleLeft extraStyle={[{flex:1, marginLeft:15}]}>
              <Text style={[stylesC.textM14]}>
                {item.detail}
              </Text>
            </Col>
            
          </Row>
        </Col>
        <Line
            style={[stylesC.lineHM,{backgroundColor:Colors.lightGray}]}/>
      </Col>
    );
  };

  async componentDidMount(){
    console.log("meals mount");
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

    console.log('size: '+plans.size);
    let date = new Date();
    let today = date.getDay();
    plans.forEach(doc => {
      this.setState(state => {
        let id = doc.id;
        let data = doc.data();
        let item = {
            day: id,
            today: today === parseInt(data.id),
            data:[
                {type:Strings.breakfast, color:'green', detail: data.b},
                {type:Strings.lunch, color:'red', detail: data.l},
                {type:Strings.snacks, color:'blue', detail: data.s},
                {type:Strings.dinner, color:'orange', detail: data.d}
            ],
        };
        const models = state.models.concat(item);
        return {models: models};
      });
    });
    
    this.setState({loading:false});   
  }

  onFocus = ()=>{
    console.log("MealPlans focus");
  };

  componentWillUnmount(){
    console.log("MealPlans unmount");
  }
}

export default MealPlans