import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Main from './src/navigation';
import {NavigationContainer} from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
