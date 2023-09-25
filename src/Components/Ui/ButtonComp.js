import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React from 'react';
  import {scale} from 'react-native-size-matters';
  
  const ButtonComp = ({
    btnText,
    containerStyle,
    btnTextStyle,
    onPress,
    custom,
    isLoading,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        
      }}>
        <View
          style={{
            ...styles?.container,
            ...containerStyle,
            opacity: isLoading ? 0.3 : 1,
          }}>
          {isLoading ? (
            <ActivityIndicator color={'white'} />
          ) : custom ? (
            custom
          ) : (
            <Text style={{...styles?.btnTextStyle, ...btnTextStyle}}>
              {btnText}
            </Text>
          )}
  
          {/* <View>
          <SvgXml xml={ArrowWhite}/>
          </View> */}
        </View>
      </TouchableOpacity>
    );
  };
  
  export default ButtonComp;
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: scale(40),
    },
    btnTextStyle: {color:"white",paddingBottom:2},
  });
  