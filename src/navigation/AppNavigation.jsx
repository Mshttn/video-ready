import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from '../screens/Dashboard/MainScreen';

import Stacknavigation from './Stacknavigation';


import DrawerNavigator from './DrawerNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MovieStack from './MovieStack';



const Stackk=createNativeStackNavigator();
const AppNavigation = () => {
  const [isauth,setIsauth] = useState(true)
  return (
    <SafeAreaProvider>
        <NavigationContainer>
<Stackk.Navigator screenOptions={{headerShown:false}}>
  {
    isauth?
   
    <Stackk.Screen name="MovieStack" component={MovieStack} />
  
    :
     
      
     <Stackk.Screen name="Stacknavigation" component={Stacknavigation} />
    
    
  }
</Stackk.Navigator>
    
   </NavigationContainer>

    </SafeAreaProvider>
 
  )
}

export default AppNavigation