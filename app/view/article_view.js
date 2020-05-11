import React from 'react';
import {View,Text,FlatList,ScrollView,TouchableOpacity,Image} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {IconButton,Loader,Row,Col,BackButton,ListItemCard,Start,Center,End,MIcon} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';

class ArticleView extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    title:'',
    text:'',
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
            <Title style={stylesC.headerTitle}>{Strings.article}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main,{backgroundColor:'white'}]}>
            <Col extraStyle={[{padding:15,marginTop:0}]}>
              <Text style={stylesC.textDB18}>
                {this.state.title}
              </Text>
              <Text style={[stylesC.textD16,{marginTop:10}]}>
                {this.state.text}
              </Text>
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

  componentDidMount(){
    console.log("ArticleView mount");
    let model = this.props.navigation.getParam('model');
    if(model != null){
      this.setState({title: model.title, text: model.text});
    }
  }

  onFocus = ()=>{
    console.log("ArticleView focus");
  };

  componentWillUnmount(){
    console.log("ArticleView unmount");
  }
}

export default ArticleView