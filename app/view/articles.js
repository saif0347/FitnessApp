import React from 'react';
import {View,Text,FlatList,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {IconButton,Loader,Row,Col,BackButton,ListItemCard,Start,Center,End,MIcon} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Utils from '../util/utils.js';
import firestore from '@react-native-firebase/firestore';
import * as Collections from '../constants/firebase';

class Articles extends React.Component {
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
            <Title style={stylesC.headerTitle}>{Strings.healthTips}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main,{backgroundColor:'white'}]}>
            <Col extraStyle={[{padding:10,marginTop:0}]}>
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
      <ListItemCard
        containerStyle={[stylesC.listItemP]}
        activeOpacity={0.6}
        cardStyle={[stylesC.card]}
        parentStyle={[stylesC.listItemCard,{padding:10}]}
        onPress={()=>{
            this.props.navigation.navigate('ArticleView', {model:item});
        }}>
        <Start extraStyle={[{width:0}]}>
        </Start>
        <Center extraStyle={[{flex:9}]}>
          <Text style={stylesC.textD16}>
            {item.title}
          </Text>
          <Text style={stylesC.textM14}>
            {item.text}
          </Text>
        </Center>
        <End extraStyle={[{flex:1}]}>
          <MIcon
            style={[stylesC.center]}
            name='angle-right' //https://fontawesome.com/icons
            type='font-awesome'
            size={30}
            color={Colors.iconMedium}/>
        </End>
      </ListItemCard>
    );
  };

  async componentDidMount(){
    console.log("Articles mount");
    const articles = await firestore()
      .collection(Collections.articles)
      .get();
    console.log('size: '+articles.size);

    articles.forEach(doc => {
      this.setState(state => {
        let item = {title: doc.data().title, text: doc.data().text};
        const models = state.models.concat(item);
        return {models: models};
      });
    });
    
    this.setState({loading:false});
  }

  onFocus = ()=>{
    console.log("Articles focus");
  };

  componentWillUnmount(){
    console.log("Articles unmount");
  }
}

export default Articles