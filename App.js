import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Splash from './app/view/splash.js';
import UserInfo from './app/view/user_info.js';
import SetGoal from './app/view/set_goal.js';
import Home from './app/view/home.js';
import Login from './app/view/login';
import Signup from './app/view/signup';
import ForgotPassword from './app/view/forgot_password';
import MealPlans from './app/view/meal_plans.js';
import Articles from './app/view/articles.js';
import ArticleView from './app/view/article_view.js';
import ContactUs from './app/view/contact_us';
import NavDrawer from './app/view/drawer.js';
import {Root} from "native-base";
import GLOBAL from './app/constants/global.js';
import MyStorage from './app/storage/storage.js';

const IntroStack = createStackNavigator({
  Splash: Splash,
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const InfoStack = createStackNavigator({
  UserInfo: UserInfo,
  SetGoal: SetGoal
},{
  /* The header settings */
  defaultNavigationOptions: null
});

const DrawerStack = createStackNavigator({
    Home: Home,
    Login: Login,
    Signup: Signup,
    ForgotPassword: ForgotPassword,
    MealPlans: MealPlans,
    Articles: Articles,
    ArticleView: ArticleView,
    ContactUs: ContactUs
  },{
    headerMode: 'float',
    /* The header settings */
    defaultNavigationOptions: null
});

const HomeStack =  createDrawerNavigator({
  DrawerStack: DrawerStack
},{
  drawerWidth:300,
  gesturesEnabled: false,
  headerMode: 'none',
  contentComponent: NavDrawer
});

const MainStack = createStackNavigator({
    Intro: IntroStack,
    Info: InfoStack,
    Home: HomeStack,
  },{
    initialRouteName: 'Intro',
    headerMode: 'none'
});

const AppContainer = createAppContainer(MainStack);

export default class App extends Component<Props> {

  render() {
    console.log('App render');
    console.disableYellowBox = true;
    if(this.state.waiting){
      return null;
    }
    else{
      return <Root>
                <AppContainer/>
            </Root>;
    }
  }

  state = {
    waiting:true
  };

  async componentDidMount() {
    GLOBAL.user_info = false;
    let isLogin = await MyStorage.isLogin();
    let user = await MyStorage.getUser();
    let age = await MyStorage.getAge();
    let tweight = await MyStorage.getTargetWeight();
    GLOBAL.isLogin = isLogin;
    GLOBAL.user = user;
    GLOBAL.moveToHome = 'false';
    GLOBAL.moveToBio = 'false';
    GLOBAL.moveToGoal = 'false';
    if(age !== '' && tweight !== ''){
      console.log('move to home');
      GLOBAL.moveToHome = 'true';
    }
    else if(age === '' && tweight === ''){
      console.log('move to bio');
      GLOBAL.moveToBio = 'true';
    }
    else if(age !== '' && tweight === ''){
      console.log('move to goal');
      GLOBAL.moveToGoal = 'true';
    }
    console.log('App componentDidMount');
    setTimeout(()=>{
      this.setState({waiting:false});
    }, 200);
  }

}