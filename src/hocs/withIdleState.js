/* eslint-disable react-hooks/rules-of-hooks */
// Core Package
import React, {useEffect, useRef} from 'react';
import {View, PanResponder, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setForceLogout, setIsLoggedOut } from '@src/redux/slices/authSlice';

// Utils
// import { INACTIVITYINSECOND } from '@src/constants';
import {ROUTES} from '../utils/routes';

export const withIdleState = Component => props => {
  const timerId = useRef(false);
  const navigation = useNavigation();
  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => resetInactivityTimeout(),
    }),
  ).current;

  const resetInactivityTimeout = () => {
    console.log('1');
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      // action after user has been detected idle
      const currentRouteName = navigation.getState().routes?.[0].name;
      console.log(currentRouteName, 'currentRouteName');
      if (currentRouteName !== 'Welcome') {
        navigation.reset({
          index: 0,
          routes: [{name: 'Welcome'}],
        });
      }
    }, 1 * 1000);
    // }
  };

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Component {...props} />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
