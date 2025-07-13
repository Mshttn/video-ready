import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Kids from '../screens/Dashboard/Kids';
import Menu from '../screens/Dashboard/Menu';
import LiveTv from '../screens/Dashboard/LiveTv';
import Moviess from '../screens/Dashboard/Moviess';
import MainScreen from '../screens/Dashboard/MainScreen';

const BottomTabs=createBottomTabNavigator();



const Tabnavigation = () => {
  return (
<BottomTabs.Navigator 
screenOptions={{
    headerShown: false,

    tabBarStyle: {
      backgroundColor: '#001D39', // 💡 Set your desired background color here
      height: 65,
      borderTopWidth: 0, // Optional: remove top border
      elevation: 0, // Android shadow
    },
  }}
>
    <BottomTabs.Screen  
    name="Home" component={MainScreen} 
    options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/home.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2680EB' : '#fff',
              }}
              resizeMode="contain"
              />
            )
    }}
    />
     <BottomTabs.Screen 
      name="Kids" component={Kids}
         options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/kids.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2680EB' : '#fff',
              }}
              resizeMode="contain"
              />
            )
    }}
       />
      <BottomTabs.Screen 
       name="Moviess" component={Moviess}
          options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/movie.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2680EB' : '#fff',
              }}
              resizeMode="contain"
              />
            )
    }}
       />
       <BottomTabs.Screen  
       name="liveTv" component={LiveTv} 
          options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/live_tv.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2680EB' : '#fff',
              }}
              resizeMode="contain"
              />
            )
    }}
       />
        <BottomTabs.Screen
          name="Menu" component={Menu}
             options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../assets/menu.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: focused ? '#2680EB' : '#fff',
              }}
              resizeMode="contain"
              />
            )
    }}
          />
  
</BottomTabs.Navigator>
  )
}

export default Tabnavigation

