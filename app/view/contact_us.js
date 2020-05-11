import React from 'react';
import {Text,TouchableOpacity} from 'react-native';
import {Container,Content,Header,Left,Body,Right,Title,Card} from 'native-base';
import * as Colors from '../constants/colors.js';
import AppStrings from '../constants/strings.js';
import {stylesC} from '../styles/style_common.js';
import {Loader,Col,BackButton} from '../custom/components.js';
import {NavigationEvents} from 'react-navigation';
import firestore from '@react-native-firebase/firestore';
import * as Collections from '../constants/firebase';

class ContactUs extends React.Component {
  static navigationOptions = {
    header: null ,
  };

  constructor(props){
    super(props);
    Strings = AppStrings.getInstance();
  }

  state = {
    loading:false,
    email: Strings.loading,
    phone: Strings.loading
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
            <Title style={stylesC.headerTitle}>{Strings.contact_us}</Title>
          </Body>
          <Right>
          </Right>
        </Header>
        <Content contentContainerStyle={[stylesC.mainWithLoader]}>
          <Col extraStyle={[stylesC.main,{padding:15}]}>
            <Card containerStyle={[stylesC.card]} style={{marginTop:15,marginLeft:15,marginRight:15,padding:15}}>
              <Text style={[stylesC.textM16]}>
                {Strings.email}:
              </Text>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={()=>{
                  // handle click
                }}>
                <Text style={[stylesC.textD16,{color:Colors.blue}]}>
                  {this.state.email}
                </Text>
              </TouchableOpacity>
              <Text style={[stylesC.textM16,{marginTop:15}]}>
                {Strings.phone}:
              </Text>
              <TouchableOpacity
                activeOpacity={0.3}
                onPress={()=>{
                  // handle click
                }}>
                <Text style={[stylesC.textD16,{color:Colors.blue}]}>
                  {this.state.phone}
                </Text>
              </TouchableOpacity>
            </Card>
          </Col>
          <Loader
            containerStyle={[stylesC.loader]}
            animating={this.state.loading}/>
          <NavigationEvents
            onDidFocus={() => {
              // onFocus
            }}/>
        </Content>
      </Container>
    );
  }

  async componentDidMount(){
    console.log("ContactUs mount");
    const contact_us = await firestore()
      .collection(Collections.contact_us)
      .doc(Collections.contact_us)
      .get();
    this.setState({email: contact_us.data().email, phone:contact_us.data().phone});
  }

  onFocus = ()=>{
    console.log("ContactUs focus");
  };

  componentWillUnmount(){
    console.log("ContactUs unmount");
  }
}

export default ContactUs