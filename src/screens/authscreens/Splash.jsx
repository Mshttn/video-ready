import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const Splash = () => {
    const navigation=useNavigation()
  return (
    <View style={{flex:1, justifyContent:'center',}}>
        <Button title='pres' onPress={()=>navigation.navigate('Crousl')}/>
      <Text>Splash</Text>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})