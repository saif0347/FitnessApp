import AsyncStorage from '@react-native-community/async-storage';

const MyStorage = {
  setGender: async (val) => {
    try {
      await AsyncStorage.setItem('gender', val)
    } catch (e) {
      // saving error
    }
  },
  getGender: async () => {
    try {
      const value = await AsyncStorage.getItem('gender')
      return value!==null? value : 'male';
    } catch(e) {
      return 'male';
    }
  },

  setAge: async (val) => {
    try {
      await AsyncStorage.setItem('age', val)
    } catch (e) {
      // saving error
    }
  },
  getAge: async () => {
    try {
      const value = await AsyncStorage.getItem('age')
      return value!==null? value : '';
    } catch(e) {
      return '';
    }
  },

  setStartWeight: async (val) => {
    try {
      await AsyncStorage.setItem('start_weight', val)
    } catch (e) {
      // saving error
    }
  },
  getStartWeight: async () => {
    try {
      const value = await AsyncStorage.getItem('start_weight')
      return value!==null? value : '';
    } catch(e) {
      return '';
    }
  },

  setCurrentWeight: async (val) => {
    try {
      await AsyncStorage.setItem('current_weight', val)
    } catch (e) {
      // saving error
    }
  },
  getCurrentWeight: async () => {
    try {
      const value = await AsyncStorage.getItem('current_weight')
      return value!==null? value : '';
    } catch(e) {
      return '';
    }
  },

  setTargetWeight: async (val) => {
    try {
      await AsyncStorage.setItem('target_weight', val)
    } catch (e) {
      // saving error
    }
  },
  getTargetWeight: async () => {
    try {
      const value = await AsyncStorage.getItem('target_weight')
      return value!==null? value : '';
    } catch(e) {
      return '';
    }
  },

  setHeight: async (val) => {
    try {
      await AsyncStorage.setItem('height', val)
    } catch (e) {
      // saving error
    }
  },
  getHeight: async () => {
    try {
      const value = await AsyncStorage.getItem('height')
      return value!==null? value : '';
    } catch(e) {
      return '';
    }
  },

  // gain/loss -> default = gain
  setWeightGoal: async (val) => {
    try {
      await AsyncStorage.setItem('weight_goal', val)
    } catch (e) {
      // saving error
    }
  },
  getWeightGoal: async () => {
    try {
      const value = await AsyncStorage.getItem('weight_goal')
      return value!==null? value : 'gain';
    } catch(e) {
      return 'gain';
    }
  },

  setLogin: async (val) => {
    try {
      await AsyncStorage.setItem('loggedIn', val)
    } catch (e) {
      // saving error
    }
  },
  isLogin: async () => {
    try {
      const value = await AsyncStorage.getItem('loggedIn')
      return value!==null? value : 'false';
    } catch(e) {
      return 'false';
    }
  },

  // json form
  setUser: async (val) => {
    try {
      if(val != null)
        await AsyncStorage.setItem('user', JSON.stringify(val))
      else
        await AsyncStorage.setItem('user', val)
    } catch (e) {
      // saving error
    }
  },
  getUser: async () => {
    try {
      const value = await AsyncStorage.getItem('user')
      if(value != null)
        return JSON.parse(value);
      else
        return null;
    } catch(e) {
      return null;
    }
  },
  removeUser: async () => {
    try {
      await AsyncStorage.removeItem('user', (error)=>{
        console.log('error: '+error);
      })
    } catch (e) {
      // saving error
    }
  },
}

export default MyStorage;
