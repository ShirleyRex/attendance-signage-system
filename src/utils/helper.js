// Core Packages

import {Alert} from 'react-native';
import TouchID from 'react-native-touch-id';
import {fetchFromLocal} from './LocalStorage';
import {STORAGE_KEY} from './constant';

const biometricConfig = {
  title: 'Authentication Required',
  color: 'blue',
  fallbackLabel: '',
  passcodeFallback: true,
};

export const formatAmount = (amount, toWholeNumber = false) => {
  if (toWholeNumber) {
    const value = Math.round(Number(amount));
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  let formattedAmount = (+amount || 0).toFixed(2).toString();
  if (!formattedAmount.includes('.')) {
    formattedAmount = `${amount}.00`;
  }
  return formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const showSuccessAlert = message => {
  Alert.alert(message);
};
export const showErrorAlert = message => {
  Alert.alert(message);
};

export const isValidHttpUrl = string => {
  const pattern = new RegExp(
    '^([a-zA-Z]+:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i',
  );
  return pattern.test(string);
};

export const BIOMETRIC_TYPE = {
  FACE_ID: 'FaceID',
  TOUCH_ID: 'TouchID',
};

export const getBiometricType = async () => {
  const supportedBio = await TouchID.isSupported(biometricConfig);
  return supportedBio;
};
export const handleLoginWithBio = async navigation => {
  try {
    let userProfile = fetchFromLocal(STORAGE_KEY.userDetails);
    if (userProfile) {
      await initiateBiometricAuth();
      navigation.navigate('TabNavigation');
    } else {
      showErrorAlert('You need to login first before using biometric');
    }
  } catch (error) {
    console.log(error?.response?.data, 'error.response.data');
    console.error('Error:', error);
    setLoading(false);
    showErrorAlert('An error occurred. Please try again.');
  }
};

export const initiateBiometricAuth = async () =>
  TouchID.authenticate('Authentication Required', biometricConfig);
