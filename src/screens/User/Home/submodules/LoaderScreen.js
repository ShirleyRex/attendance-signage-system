import React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

const LoaderScreen = ({isVisible}) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
        {/* <CustomText style={styles.loaderText}>Processing...</CustomText> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    width: 150,
    alignSelf: 'center',
    borderRadius: 10,
  },
  loaderText: {
    marginTop: 10,
    fontFamily: 'Gilroy-Medium',
  },
});

export default LoaderScreen;
