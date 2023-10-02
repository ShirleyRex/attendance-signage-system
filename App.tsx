import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Main from './src/navigation';
import { NavigationContainer, useNavigation, useNavigationContainerRef } from '@react-navigation/native';
import UserInactivity from 'react-native-user-inactivity';

export default function App() {
  // const navigationRef = useNavigationContainerRef();
  // const navigation = useNavigation();


  return (
    // <UserInactivity
    //   isActive={true}
    //   timeForInactivity={10000}
    //   onAction={isActive => {
    //     const currentRouteName = navigation.getState().routes?.[0].name;
    //     console.log(currentRouteName, "");

    //     if (!isActive) {
    //       Alert.alert('You have been  logout due to inactivity.');
    //       navigationRef.navigate("Welcome");
    //     }
    //   }}
    //   style={{ flex: 1 }}
    // >
    <NavigationContainer>
      <Main />
    </NavigationContainer>
    // </UserInactivity>

  );
}

const styles = StyleSheet.create({});
