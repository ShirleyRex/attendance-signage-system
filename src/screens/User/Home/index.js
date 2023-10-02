import {
  FlatList,
  PermissionsAndroid,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import OptionHeader from '../../../Components/Common/Header';
import {scale} from 'react-native-size-matters';
import ButtonComp from '../../../Components/Ui/ButtonComp';
import List from './submodules/List';
import {fetchFromLocal} from '../../../utils/LocalStorage';
import {CONSTANT, STORAGE_KEY} from '../../../utils/constant';
import Back4AppUtility from '../../../utils/Back4AppUtility';
import {
  initiateBiometricAuth,
  showErrorAlert,
  showSuccessAlert,
} from '../../../utils/helper';
import CheckingsList from './submodules/CheckingsList';
import LoaderScreen from './submodules/LoaderScreen';
import Geolocation from 'react-native-geolocation-service';

export default function Home() {
  const {setOptions, toggleDrawer} = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [allClassesToAttend, setAllClassesToAttend] = React.useState([]);
  const [readyForChecking, setReadyForChecking] = React.useState([]);
  const [notForChecking, setNotForChecking] = React.useState([]);
  const [loginUserData, setLoginUserData] = React.useState({});
  const [myAttendanceRecord, setMyAttendanceRecord] = React.useState([]);
  const [location, setLocation] = useState(false);
  useEffect(() => {}, []);

  useEffect(() => {
    fetchUserProfile();
    getCourses();
    // getLocation();
  }, []);
  useEffect(() => {
    getMyAttendanceRecord();
  }, [loginUserData]);
  useEffect(() => {
    checkIfStudentCheckedIn();
  }, [myAttendanceRecord, readyForChecking]);

  const fetchUserProfile = async () => {
    let userProfile = fetchFromLocal(STORAGE_KEY.userDetails);
    console.log(userProfile, 'userProfile');
    setLoginUserData(userProfile);
  };

  const getCourses = async () => {
    try {
      setLoading(true);
      const schoolClasses = await Back4AppUtility.getAllRecord(
        CONSTANT.AvailbleClasses,
      );
      setLoading(false);
      let res = schoolClasses?.results;
      console.log(res, 'results');
      const recordsWithReadyCheckIn = res.filter(
        record => record.isReadyCheckIn === true,
      );
      const recordsWithNotReadyCheckIn = res.filter(
        record => record.isReadyCheckIn === false,
      );

      setAllClassesToAttend(res);
      setReadyForChecking(recordsWithReadyCheckIn);
      setNotForChecking(recordsWithNotReadyCheckIn);
    } catch (error) {
      console.log(error?.response?.data, 'error.response.data');
      console.error('Error:', error);
      setLoading(false);
      showErrorAlert('An error occurred. Please try again.');
    }
  };
  const getMyAttendanceRecord = async () => {
    try {
      let studentObjectid = loginUserData?.objectId;
      setLoading(false);
      const queryConditions = [
        {
          studentObjectid: studentObjectid,
        },
      ];
      const myAttendanceRecord = await Back4AppUtility.queryRecords(
        CONSTANT.studentCheckings,
        queryConditions,
      );
      console.log(myAttendanceRecord, 'myAttendanceRecord');
      setMyAttendanceRecord(myAttendanceRecord);
    } catch (error) {
      console.log(error?.response?.data, 'error.response.data');
      // console.error('Error:', error);
      setLoading(false);
      showErrorAlert('An error occurred. Please try again.');
    }
  };
  const checkInStudent = async lectureData => {
    console.log(lectureData, 'lectureData');
    const {UserCheckedIn} = lectureData;
    if (UserCheckedIn) {
      showErrorAlert('You have already signed in for this class');
      return;
    }
    let lectureObjectId = lectureData?.objectId;
    let studentObjectid = loginUserData?.objectId;
    try {
      await userBiometricSignIn();
      setLoading(true);
      let TableClass = CONSTANT.studentCheckings;
      const newData = {
        studentObjectid: studentObjectid,
        lectureObjectId: lectureObjectId,
      };

      console.log(newData, 'newData');
      const response = await Back4AppUtility.createRecord(TableClass, newData);
      console.log('Record created:', response);

      setLoading(false);
      RefreshTable();
      showSuccessAlert('Attendance Recorded successfully');
    } catch (error) {
      console.log(error.response.data, 'error.response.data');
      console.error('Error:', error);
      setLoading(false);
      showErrorAlert('An error occurred. Please try again.');
    }
  };
  const checkIfStudentCheckedIn = async () => {
    const lectureObjectIds = myAttendanceRecord.map(
      record => record.lectureObjectId,
    );

    // Check if any objectId from records1 exists in lectureObjectIds
    const matchFound = readyForChecking.some(record => {
      if (lectureObjectIds.includes(record.objectId)) {
        // If a match is found, add a new property UsercheckedIn with value true
        record.UserCheckedIn = true;
        // return true; // Return true to indicate a match was found
      } else {
        record.UserCheckedIn = false;
      }
      // return false; // No match found
    });
  };
  const userBiometricSignIn = async () => {
    try {
      await initiateBiometricAuth();
    } catch (err) {
      console.log(err, 'err');
      console.error(err.message);
    }
  };
  const RefreshTable = async () => {
    getMyAttendanceRecord();
    getCourses();
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
  };
  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position, 'position');
            setLocation(position);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location);
  };
  return (
    <View style={{flex: 1}}>
      <ScrollView
        nestedScrollEnabled
        scrollEnabled={true}
        style={{flex: 1}}
        contentContainerStyle={{}}>
        <View style={{flex: 1, paddingBottom: 150}}>
          <FlatList
            nestedScrollEnabled
            data={notForChecking}
            ListHeaderComponent={
              <FlatList
                nestedScrollEnabled
                data={readyForChecking}
                horizontal={false}
                automaticallyAdjustContentInsets
                bounces={false}
                keyboardShouldPersistTaps="never"
                showsHorizontalScrollIndicator={false}
                renderItem={({item, index}) => (
                  <CheckingsList
                    dataObject={item}
                    index={index}
                    showCheckingBtn={true}
                    handleCheckInStudent={checkInStudent}
                  />
                )}
              />
            }
            horizontal={false}
            automaticallyAdjustContentInsets
            bounces={false}
            keyboardShouldPersistTaps="never"
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <List dataObject={item} index={index} />
            )}
            ListFooterComponent={
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  // borderWidth:1
                  // marginTop: 20,
                }}>
                <ButtonComp
                  btnText={'Refresh Timetable'}
                  btnTextStyle={styles?.btnText}
                  containerStyle={{
                    backgroundColor: '#25a6f0',
                    paddingHorizontal: 10,
                    borderRadius: 20,
                    height: 40,
                    marginTop: 5,
                  }}
                  onPress={RefreshTable}
                />
              </View>
            }
          />

          <LoaderScreen isVisible={loading} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Box: {
    backgroundColor: '#d9d9d9',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    fontWeight: '600',
    fontSize: 13,
  },
  titleStyle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 13,
    marginBottom: scale(4),
  },
  descStyle: {
    fontSize: 10,
    color: 'black',
    fontWeight: '600',
  },
});
