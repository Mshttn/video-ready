import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/authscreens/Splash';
import Geners from '../screens/authscreens/Geners';
import Crousl from '../screens/authscreens/Crousl';
import Signupin from '../screens/authscreens/Signupin';
import UserProfile from '../screens/authscreens/UserProfile';


const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen  options={{headerShown:false}} name="Splash" component={Splash} />

      
          <Stack.Screen  options={{headerShown:false}}   name="Crousl" component={Crousl} />
            <Stack.Screen options={{headerShown:false}}   name="Signupin" component={Signupin} />
              <Stack.Screen  name="UserProfile" component={UserProfile} />
                <Stack.Screen   name="Geners" component={Geners} />

    </Stack.Navigator>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})