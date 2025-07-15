import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Kids from '../screens/Dashboard/Kids';
import Menu from '../screens/Dashboard/Menu';
import LiveTv from '../screens/Dashboard/LiveTv';
import Moviess from '../screens/Dashboard/Moviess';
import MainScreen from '../screens/Dashboard/MainScreen';
import { colors } from '../constants/Colors';

const BottomTabs=createBottomTabNavigator();



const Tabnavigation = () => {
  return (
<BottomTabs.Navigator 
screenOptions={{
    headerShown: false,

    tabBarStyle: {
      backgroundColor: colors.tabBarColor,
      height: 65,
      borderTopWidth: 0,
      elevation: 0,
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
                tintColor: focused ? colors.tabBarActiveTintColor : colors.tabBarInactiveTintColor,
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
                tintColor: focused ? colors.tabBarActiveTintColor : colors.tabBarInactiveTintColor,
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
                tintColor: focused ? colors.tabBarActiveTintColor : colors.tabBarInactiveTintColor,
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
                tintColor: focused ? colors.tabBarActiveTintColor : colors.tabBarInactiveTintColor,
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
                tintColor: focused ? colors.tabBarActiveTintColor : colors.tabBarInactiveTintColor,
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

