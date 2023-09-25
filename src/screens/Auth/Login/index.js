import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import TextInputComp from '../../../Components/Ui/TextInput';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';
import {showErrorAlert, showSuccessAlert} from '../../../utils/helper';
import Back4AppUtility from '../../../utils/Back4AppUtility';
import {CONSTANT, STORAGE_KEY} from '../../../utils/constant';
import {saveToLocal} from '../../../utils/LocalStorage';

export default function Login({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [studentId, setStudentId] = React.useState('T487uyo99899');
  const [password, setPassword] = React.useState('5668888');

  const handleRegister = async () => {
    try {
      if (studentId === '') {
        showErrorAlert('Please enter student id');
        return;
      }
      if (password === '') {
        showErrorAlert('Please enter password');
        return;
      }
      setLoading(true);
      const queryConditions = [{studentId: studentId}, {password: password}];
      const checkIfTaken = await Back4AppUtility.queryRecords(
        CONSTANT.USER_REGISTER,
        queryConditions,
      );
      setLoading(false);
      console.log(checkIfTaken, 'results');
      if (checkIfTaken.length > 0) {
        showSuccessAlert('Login successful');
        let dataResponse = checkIfTaken[0];
        console.log(dataResponse, 'dataResponse');
        saveToLocal(STORAGE_KEY.userDetails, dataResponse);
        navigation.navigate('TabNavigation');
      } else {
        setLoading(false);
        showErrorAlert('Student Id does not exist');
        return;
      }
      // let TableClass = CONSTANT.USER_REGISTER;
      // const newData = {
      //   studentId: studentId,
      //   password: password,
      // };

      // showSuccessAlert('Record Created successfully');
    } catch (error) {
      console.log(error?.response?.data, 'error.response.data');
      console.error('Error:', error);
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
          paddingHorizontal: Dimensions?.get('screen')?.width / 5.5,
        }}>
        <Text style={styles?.HeaderText}>Login</Text>
        <View style={{marginBottom: 60}}>
          <TextInputComp
            placeholder={'Student ID'}
            textStyle={{marginBottom: 20}}
            value={studentId}
            onChangeText={value => {
              setStudentId(value);
            }}
          />
          <TextInputComp
            placeholder={'Password'}
            secureTextEntry={true}
            value={password}
            onChangeText={value => {
              setPassword(value);
            }}
          />
        </View>
        <View>
          <ButtonComp
            btnText={loading ? 'Loading...' : 'Login'}
            containerStyle={{
              backgroundColor: '#25a6f0',
              borderRadius: 30,
              marginBottom: 15,
            }}
            btnTextStyle={{
              fontSize: 20,
              color: 'white',
              fontWeight: '700',
            }}
            onPress={handleRegister}
            disabled={loading}
          />
          <Text style={styles?.BottomText}>Login in with Fingerprint</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    // width: '100%',
    //  flexDirection:'column',
    height: Dimensions?.get('screen')?.height - StatusBar?.currentHeight,
    width: Dimensions?.get('screen')?.width,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    // borderWidth:10
  },
  HeaderText: {
    fontSize: scale(28),
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
