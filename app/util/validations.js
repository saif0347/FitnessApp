import Utils from '../util/utils.js';
import AppStrings from '../constants/strings.js';

const Strings = AppStrings.getInstance();

const Validations = {
  checkName: (object)=>{
    console.log('name: '+object.state.name);
    if(object.state.name === ''){
      object.setState({nameError: Strings.required});
      return false;
    }
    object.setState({nameError: null});
    return true;
  },

  checkEmail: (object)=>{
    console.log('email: '+object.state.email);
    if(!Utils.checkEmail(object.state.email.replace('+',''))){
      console.log('invalid email: '+object.state.email.replace('+',''));
      return false;
    }
    return true;
  },

  checkPassword: (object)=>{
    if(object.state.password === ''){
      object.setState({passwordError: Strings.required});
      return false;
    }
    if(object.state.password.length < 8){
      object.setState({passwordError: Strings.passLength});
      return false;
    }
    object.setState({passwordError: null});
    return true;
  },

  checkPhone: (object)=>{
    if(object.state.phone !== ''){
      if(object.state.phone.length < 10){
        object.setState({phoneError: Strings.phoneLength});
        return false;
      }
    }
    object.setState({phoneError: null});
    return true;
  },

}

export default Validations
