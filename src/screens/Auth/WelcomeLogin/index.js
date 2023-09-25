import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';

export default function WelcomeLogin() {
  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={{backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: Dimensions?.get('screen')?.width / 5.5,
        }}>
        <View style={{marginBottom: 50}}>
          <Text style={styles?.HeaderText}>Welcome back</Text>
          <Text style={styles?.HeaderText}> 👋🏾</Text>
          <Text style={styles?.DescText}>Sign in to your account</Text>
        </View>
        <ButtonComp
          btnText={'Login with Fingerprint'}
          containerStyle={{
            backgroundColor: '#25a6f0',
            borderRadius: 30,
            marginBottom: 25,
          }}
          btnTextStyle={{
            fontSize: 18,
            color: 'white',
            fontWeight: '700',
          }}
        />
        <Text style={styles?.BottomText}>Login in with Password</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: scale(28),
    fontWeight: '700',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    // flex:1
  },
  DescText: {
    marginTop: 10,
    fontSize: scale(15),
    fontWeight: '700',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    // flex:1
  },
  BottomText: {
    fontSize: scale(11),
    fontWeight: '700',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    // flex:1
  },
});
