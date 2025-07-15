import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetails from '../screens/Dashboard/MovieDetails';
import Download from '../screens/Dashboard/Download';
import VideoScreen from '../screens/Dashboard/VideoScreen';
import DrawerNavigator from './DrawerNavigator';
import MyProfile from '../screens/Dashboard/MyProfile';
import EditGenres from '../screens/Dashboard/EditGenres';

const Stack=createNativeStackNavigator();

const MovieStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Drawer" component={DrawerNavigator}/>

        <Stack.Screen name="MovieDetails" component={MovieDetails}/>
        <Stack.Screen name="Video" component={VideoScreen}/>
        <Stack.Screen name="Download" component={Download}/>
        <Stack.Screen name='Myprofile' component ={MyProfile}/>
         <Stack.Screen name='EditGenres' component ={EditGenres}/>
    </Stack.Navigator>
    
  )
}

export default MovieStack

