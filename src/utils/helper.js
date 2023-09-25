// Core Packages

import {Alert} from 'react-native';

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
