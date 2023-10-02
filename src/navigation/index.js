import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/User/Home';
import WelcomeLogin from '../screens/Auth/WelcomeLogin';
import Message from '../screens/Auth/Message';
import Fingerprint from '../screens/User/FingerPrint';
import TabNavigation from './tabNaviagtion';
import {fetchFromLocal} from '../utils/LocalStorage';
import {STORAGE_KEY} from '../utils/constant';
import {withIdleState} from '../hocs';

const Stack = createStackNavigator();

function Main() {
  const [isExistingUser, setIsExistingUser] = React.useState(false);
  const fetchUserProfile = async () => {
    let userProfile = fetchFromLocal(STORAGE_KEY.userDetails);
    console.log(userProfile, 'userProfile');
    if (userProfile) {
      setIsExistingUser(true);
    } else {
      setIsExistingUser(false);
    }
    //
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    // <Stack.Navigator initialRouteName='TabNavigation' screenOptions={{headerShown:false}}>
    <Stack.Navigator
      initialRouteName={isExistingUser ? 'Welcome' : 'Welcome'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="Home"
        options={{headerShown: true}}
        component={Home}
      />
      <Stack.Screen name="Welcome" component={WelcomeLogin} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Fingerprint" component={Fingerprint} />
      <Stack.Screen name="TabNavigation" component={TabNavigation} />
    </Stack.Navigator>
  );
}
export default withIdleState(Main);
// export default Main;

const styles = StyleSheet.create({});
