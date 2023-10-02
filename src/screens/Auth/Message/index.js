import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';
import {MarkIcon} from '../../../access';
import {showErrorAlert} from '../../../utils/helper';

export default function Message({navigation}) {
  const handleRegister = async () => {
    try {
      navigation.navigate('Login');
    } catch (error) {
      setLoading(false);
      showErrorAlert('An error occurred. Please try again.');
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{flex: 1}}
      style={{backgroundColor: 'white'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: Dimensions?.get('screen')?.width / 6,
        }}>
        <View style={{marginBottom: 40, alignItems: 'center'}}>
          <Image
            source={MarkIcon}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              marginBottom: 70,
            }}
          />
          <Text style={styles?.HeaderText}>Congratulations!!!</Text>
          <Text style={styles?.DescText}>
            You have successfully registered your account
          </Text>
        </View>
        <ButtonComp
          btnText={'Proceed to login'}
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
          onPress={handleRegister}
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
