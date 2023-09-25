import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Menu } from '../access';
import Home from '../screens/User/Home';

//user-circle-o

//home
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children,onPress})=>(
  <TouchableOpacity
  style={{
    top:-30,
    justifyContent:'center',
    alignItems:'center'
  }}

  onPress={onPress}
  >
    <View
    style={{
      width:70,
      height:70,
      borderRadius:35
    }}
    >
      {children}
    </View>

  </TouchableOpacity>
)

export default function TabNavigation() {
  return (
    <Tab.Navigator
    tabBarOptions={{
      showLabel:false,
      
    }
    }
    screenOptions={({ route }) => ({
      tabBarStyle:{
        // backgroundColor:'#0000ff',
        height:80,
        position:'absolute',
        shadowOpacity:0,
        shadowRadius:0,
        
        // left:10,
        // right:10
      },
      tabBarItemStyle:{
        // backgroundColor:'#00ff00',
        margin:5,
        borderRadius:10,
      },
      tabBarIcon: ({ focused, color='black', size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused
            ? <AntDesign name={'home'} size={40} color={color} />
            : <AntDesign name={'Home'} size={40} color={color} />
        } 
        if (route.name === 'Home1') {
          iconName = focused
            ? <FontAwesome name={'user-circle-o'} size={40} color={'black'} />
            : <FontAwesome name={'user-circle-o'} size={40} color={'black'} />
        }
        if (route.name === 'Home2') {
          iconName = focused
            ? <FontAwesome name={'user-circle-o'} size={40} color={'black'} />
            : <FontAwesome name={'graduation-cap'} size={40} color={'black'} />
        }
        else if (route.name === 'Settings') {
          iconName = focused ? <AntDesign name={'calendar'} size={40} color={color} />: <AntDesign name={'calendar'} size={40} color={'black'} />
        }

        //graduation-cap

        // You can return any component that you like here!
        return iconName ;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}
    
  >
    <Tab.Screen name="Home" component={Home} />
    <Tab.Screen name="Home1" component={HomeScreen} />
    <Tab.Screen name="HomeM" component={HomeScreen}
    options={{
      tabBarIcon:({focused})=>(
        <Image
        source={Menu }
        style={{
          width:70,
          height:70,
          resizeMode:'contain'
        }}
        />
      ),
      tabBarButton:(props)=>(
        <CustomTabBarButton {...props}/>
      )
    }}
    />

    <Tab.Screen name="Home2" component={HomeScreen} />

    <Tab.Screen name="Settings" component={SettingsScreen} />
  </Tab.Navigator>
  );
}