import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Splash from '../screens/authscreens/Splash';
import Geners from '../screens/authscreens/Geners';
import Crousl from '../screens/authscreens/Crousl';
import Signupin from '../screens/authscreens/Signupin';
import UserProfile from '../screens/authscreens/UserProfile';
import EditProfile from '../screens/authscreens/EditProfile';
import UserEdit from '../screens/authscreens/UserEdit';


const Stack = createNativeStackNavigator();

const Stacknavigation = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen  options={{headerShown:false}} name="Splash" component={Splash} />

      
          <Stack.Screen  options={{headerShown:false}}   name="Crousl" component={Crousl} />
            <Stack.Screen options={{headerShown:false}}   name="Signupin" component={Signupin} />
              <Stack.Screen  options={{headerShown:false}} name="UserProfile" component={UserProfile} />
                <Stack.Screen  options={{headerShown:false}} name="EditProfile" component={EditProfile} />

                  <Stack.Screen  options={{headerShown:false}}  name="UserEdit" component={UserEdit} />
                 <Stack.Screen  options={{headerShown:false}}  name="Geners" component={Geners} />

    </Stack.Navigator>
  )
}

export default Stacknavigation

const styles = StyleSheet.create({})