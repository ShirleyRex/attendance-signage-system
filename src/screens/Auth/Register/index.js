import {
  Alert,
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
import Back4AppUtility from '../../../utils/Back4AppUtility';
import {
  initiateBiometricAuth,
  showErrorAlert,
  showSuccessAlert,
} from '../../../utils/helper';
import {CONSTANT} from '../../../utils/constant';

// export default function Register() {
const Register = ({navigation}) => {
  const [loading, setLoading] = React.useState(false);
  const [studentId, setStudentId] = React.useState('');
  const [password, setPassword] = React.useState('');

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
      const queryConditions = [
        {
          studentId: studentId,
        },
      ];
      const checkIfTaken = await Back4AppUtility.queryRecords(
        CONSTANT.USER_REGISTER,
        queryConditions,
      );
      console.log(checkIfTaken, 'results');
      if (checkIfTaken.length > 0) {
        setLoading(false);
        showErrorAlert('Student Id already taken');
        return;
      }
      let TableClass = CONSTANT.USER_REGISTER;
      const newData = {
        studentId: studentId,
        password: password,
      };
      console.log(newData, 'newData');
      const response = await Back4AppUtility.createRecord(TableClass, newData);
      console.log('Record created:', response);

      setLoading(false);
      await userBiometricSignIn();
      // showSuccessAlert('Record Created successfully');

      navigation.navigate('Message');
    } catch (error) {
      console.log(error?.response?.data, 'error.response.data');
      console.error('Error:', error);
      setLoading(false);
      showErrorAlert('An error occurred. Please try again.');
    }
  };
  const userBiometricSignIn = async () => {
    try {
      await initiateBiometricAuth();
    } catch (err) {
      console.log(err, 'err');
      console.error(err.message);
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
        <Text style={styles?.HeaderText}>Register Account</Text>
        <View style={{marginBottom: 60}}>
          <TextInputComp
            placeholder={'Student ID'}
            textStyle={{marginBottom: 20}}
            onChangeText={value => {
              setStudentId(value);
            }}
          />
          <TextInputComp
            placeholder={'Password'}
            secureTextEntry={true}
            onChangeText={value => {
              setPassword(value);
            }}
          />
        </View>
        <View>
          <ButtonComp
            btnText={loading ? 'adding...' : 'Register'}
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
        </View>
      </View>
    </ScrollView>
  );
};

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
export default Register;
