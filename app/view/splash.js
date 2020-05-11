import React from 'react';
import {View,SafeAreaView,StatusBar} from 'react-native';
import * as Colors from '../constants/colors.js';
import {stylesC} from '../styles/style_common.js';
import {Col} from '../custom/components.js';
import Utils from '../util/utils.js';
import MyStorage from '../storage/storage.js';
import GLOBAL from '../constants/global.js';

class Splash extends React.Component {
  static navigationOptions = {
    header:null
  };

  constructor(props){
    super(props);
    this.navigateScreen();
  }

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
                </Col>
            </View>
        </SafeAreaView>
    );
  }

  navigateScreen = ()=>{
    console.log('navigateScreen');
    if(GLOBAL.moveToHome === 'true'){
      Utils.moveToAnotherStack(this.props.navigation, 'Home');
    }
    else if(GLOBAL.moveToBio === 'true'){
      Utils.moveToAnotherStack(this.props.navigation, 'Info');
    }
    else if(GLOBAL.moveToGoal === 'true'){
      Utils.moveToScreen(this.props.navigation, 'Info', 'SetGoal');
    }
  };

  async componentDidMount(){
    
  }
}

export default Splash