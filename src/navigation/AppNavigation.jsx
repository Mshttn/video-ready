import React ,{useEffect}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from '../redux/store';
import Stacknavigation from './Stacknavigation'; 
import MovieStack from './MovieStack';          
import BootSplash from 'react-native-bootsplash';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stackk = createNativeStackNavigator();


const AppNavigatorInner = () => {
  const { email } = useSelector((state) => state.user);
  const isAuth = !!email; 
  

  return (
    <NavigationContainer  onReady={() => {
      BootSplash.hide();
    }}
>
     
      
      <Stackk.Navigator screenOptions={{ headerShown: false }}>
          <Stackk.Screen name="Stacknavigation" component={Stacknavigation} />
        
          <Stackk.Screen name="MovieStack" component={MovieStack} />
  
        

      </Stackk.Navigator>
    </NavigationContainer>
  );
};

const AppNavigation = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          
          <AppNavigatorInner />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppNavigation;
