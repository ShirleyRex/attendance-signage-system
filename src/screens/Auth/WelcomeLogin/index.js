import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';
import {fetchFromLocal} from '../../../utils/LocalStorage';
import {STORAGE_KEY} from '../../../utils/constant';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {handleLoginWithBio} from '../../../utils/helper';

export default function WelcomeLogin({navigation}) {
  const [loginUserData, setLoginUserData] = React.useState({});
  const [isExistingUser, setIsExistingUser] = React.useState(false);

  const fetchUserProfile = async () => {
    let userProfile = fetchFromLocal(STORAGE_KEY.userDetails);
    console.log(userProfile, 'userProfile');
    if (userProfile) {
      setLoginUserData(userProfile);
      setIsExistingUser(true);
    } else {
      setLoginUserData({});
      setIsExistingUser(false);
      navigation.navigate('Register');
    }
    //
  };
  const gotoLogin = async () => {
    navigation.navigate('Login');
  };
  const handleGotoRegister = async () => {
    navigation.navigate('Register');
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
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
        {isExistingUser ? (
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
            onPress={() => handleLoginWithBio(navigation)}
          />
        ) : (
          <ButtonComp
            btnText={'Register Account'}
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
            onPress={handleGotoRegister}
          />
        )}
        <TouchableOpacity onPress={gotoLogin}>
          <Text style={styles?.BottomText}>Login in with Password</Text>
        </TouchableOpacity>
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
