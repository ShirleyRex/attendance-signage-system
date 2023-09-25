import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ButtonComp from '../../../../Components/Ui/ButtonComp';
import {scale} from 'react-native-size-matters';

export default function List({dataObject, index, showCheckingBtn = false}) {
  const {
    ClassName,
    DayOfWeek,
    EndTime,
    month,
    startTime,
    lectureType,
    isMandatory,
    lectureHall,
  } = dataObject;
  return (
    <View style={{position: 'relative'}} key={index}>
      <Text
        style={{
          textAlign: 'center',
          color: 'black',
          fontSize: 12,
          fontWeight: '600',
        }}>
        {DayOfWeek}
      </Text>
      <View style={styles?.Box}>
        <Text style={styles?.titleStyle}>
          {ClassName} - {lectureType}
        </Text>
        <Text style={styles?.descStyle}>
          {month} {startTime} - {EndTime}{' '}
          {isMandatory ? 'MANDATORY' : 'NOT MANDATORY'}
        </Text>
        <Text style={styles?.descStyle}>{lectureHall} </Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <ButtonComp
            btnText={isMandatory ? 'MANDATORY' : 'NOT MANDATORY'}
            btnTextStyle={styles?.btnText}
            containerStyle={{
              backgroundColor: '#25a6f0',
              paddingHorizontal: 10,
              borderRadius: 20,
              height: 35,
              marginTop: 5,
            }}
          />
        </View>
        {showCheckingBtn ? (
          <>
            <View
              style={{
                backgroundColor: 'white',
                height: 1,
                marginVertical: scale(5),
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <ButtonComp
                btnText={'Check in'}
                btnTextStyle={{
                  fontWeight: '600',
                  fontSize: 16,
                }}
                containerStyle={{
                  backgroundColor: '#f12323',
                  paddingHorizontal: 15,
                  borderRadius: 20,
                  height: 40,
                  // paddingVertical:8,
                }}
              />
            </View>
          </>
        ) : null}
      </View>
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
