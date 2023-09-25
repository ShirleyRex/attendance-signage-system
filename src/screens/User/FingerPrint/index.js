import {Dimensions, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';
import {  MarkIcon } from '../../../access';
import { SvgXml } from 'react-native-svg';
import { FingerPrintIcon } from '../../../utils/svg';

export default function Fingerprint() {
  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={{backgroundColor: '#c2c2c2'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: Dimensions?.get('screen')?.width / 6,
        }}>
        <View style={{marginBottom: 40, alignItems:'center',}}>
          {/* <Image
          source={MarkIcon}
          style={{width:100,height:100,resizeMode:'contain',marginBottom:70}}
          /> */}
          <Text style={styles?.HeaderText}>Authentication</Text>
          <SvgXml xml={FingerPrintIcon}/>
          <Text style={styles?.DescText}>
          Use Fingerprint to unlock the app
          </Text>
        </View>
        <ButtonComp
          btnText={'Login in with Password'}
          containerStyle={{
            // backgroundColor: '#25a6f0',
            borderRadius: 30,
            marginBottom: 25,
          }}
          btnTextStyle={{
            fontSize: 13,
            color: 'black',
            fontWeight: '700',
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    fontSize: scale(18),
    fontWeight: '700',
    color: 'black',
    marginBottom: 30,
    textAlign: 'center',
    // flex:1
  },
  DescText: {
    marginTop: 10,
    fontSize: scale(13),
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
