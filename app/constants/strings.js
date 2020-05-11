
export default class AppStrings {

  // App Texts - Can be modified
  // Note: Only values inside quotes should be changed and not the keys
  // Format >> key = value
  emailExists = 'Unable to signup with this email.';
  phoneLength = 'Phone should be atleast 10 letters';
  passLength = 'Password should be atleast 8 letters';
  invalidEmail = 'Invalid email';
  required = 'Required';
  passSent = 'Password sent via email';
  country = 'Country';
  province = 'State/Province';
  city = 'City';
  article = 'Article';
  healthTips = 'Health Tips';
  loading = 'Loading..';
  contact_us = 'Contact Us';
  email = 'Email';
  password = 'Password';
  phone = 'Phone';
  version = 'Version';
  hello = 'Hello';
  login = 'Login';
  signup = 'Signup';
  wg = 'Weight Goal';
  eb = 'Edit Bio';
  mp = 'Meal Plans';
  ht = 'Health Tips';
  logout = 'Logout';
  fp = 'Forgot Password';
  submit = 'Submit';
  er = 'Email required';
  pr = 'Password required';
  es = 'Email sent!';
  rf = 'Request failed!';
  breakfast = 'Breakfast';
  lunch = 'Lunch';
  snacks = 'Snacks';
  dinner = 'Dinner';
  home  = 'Home';
  gp = 'Goal Progress';
  weight = 'Weight'; 
  rem = 'Remaining';
  gc = 'Goal Completed';
  start = 'Start';
  current = 'Current';
  target = 'Target';
  tmp = "Today's Meal Plan";
  va = 'View All';
  lis = 'Logged in successfully!';
  utl = 'Unable to login!';
  today = 'Today';
  iwt = 'I want to';
  gw = 'Gain Weight';
  lw = 'Lose Weight';
  sg = 'Set Goal';
  err1 = 'Target weight should be greater than current weight.';
  err2 = 'Target weight should be less than current weight.';
  name = 'Name';
  cpassword = 'Confirm Password';
  nr = 'Name required';
  cpr = 'Confirm Password required'
  pm = 'Password mismatch';
  sus = 'Signed up successfully!';
  err3 = 'That email address is already in use!';
  err4 = 'That email address is invalid!';
  male = 'Male';
  female = 'Female';
  age = 'Age';
  years = 'years';
  height = 'Height';
  inches = 'inches';
  mb = 'My Bio';
  ar = 'Age Required';
  wr = 'Weight Required';
  hr = 'Height Required';

  static instance = null;

  static getInstance() {
      if (AppStrings.instance == null) {
        console.log('AppStrings new object');
        AppStrings.instance = new AppStrings();
      }
      return this.instance;
  }
}
