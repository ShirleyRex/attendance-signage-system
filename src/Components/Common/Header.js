import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {scale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { SearchIcon, notificationBellIcon } from '../../utils/svg';


export default function OptionHeader({title,titleStyle,refresh=false,icon}) {
  //navigation.navigate(SELLER_PROFILE,{refresh:refresh}
    const navigation =useNavigation()
  return (
    <View
      style={{
        paddingTop:scale(24),
        paddingBottom:scale(10),
        paddingHorizontal: scale(6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#25a6f0',
        // borderWidth:1,
        alignItems: 'center',
      }}>
      {/* ... */}
      <TouchableOpacity
        style={[{width: 50,flex:1,backgroundColor:'white',
    borderRadius:30,flexDirection:'row',alignItems:'center', paddingHorizontal:20,
    gap:8
    }]}
        onPress={() =>navigation.goBack() }>
            <SvgXml xml={SearchIcon}/>
       <TextInput
       placeholder='Search'
       style={{
        // backgroundColor:'white'
       }}
       />
      </TouchableOpacity>
      
      
      <TouchableOpacity
        style={{marginLeft:5}}
        onPress={() => {}}>
        <SvgXml xml={notificationBellIcon} />
      </TouchableOpacity>
    </View>
  );
}
