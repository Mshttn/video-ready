
import React from 'react'

import PhoneAuth from './src/screens/PhoneAuth'
import Profile from './src/screens/Profile'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigation from './src/navigation/AppNavigation'

const App = () => {
  return (
    <SafeAreaProvider>
     <AppNavigation/>
    </SafeAreaProvider>
    
   
    
   
  )
}

export default App

