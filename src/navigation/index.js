import {createStackNavigator} from '@react-navigation/stack';
import {StyleSheet, Text, View} from 'react-native';
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import Home from '../screens/User/Home';
import WelcomeLogin from '../screens/Auth/WelcomeLogin';
import Message from '../screens/Auth/Message';
import Fingerprint from '../screens/User/FingerPrint';
import TabNavigation from './tabNaviagtion';

const Stack = createStackNavigator();

export default function Main() {
  return (
    // <Stack.Navigator initialRouteName='TabNavigation' screenOptions={{headerShown:false}}>
    <Stack.Navigator
      initialRouteName="Login"
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

const styles = StyleSheet.create({});
