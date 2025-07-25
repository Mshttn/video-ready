import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, StyleSheet } from 'react-native';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import {PhoneIcon} from "react-native-heroicons/solid"
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constants/Colors';
import { Fonts } from '../constants/fonts';

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [code, setCode] = useState('');
  const navigation=useNavigation();

  const auth = getAuth();

  const settings = firebase.auth().settings;
  settings.appVerificationDisabledForTesting = true;

  const sendOtp = async () => {
    try {
      const result = await signInWithPhoneNumber(auth, phoneNumber);
      setConfirmResult(result);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const verifyCode = async () => {
    try {
      await confirmResult.confirm(code);
      Alert.alert('Success', 'Phone number verified!');
      // navigation.replace('MainScreen')

    } catch (error) {
      Alert.alert('Invalid Code', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sign in </Text>
      <PhoneIcon size={22} color="red"/>
      
      {!confirmResult ? (
        <>
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter phone number"
            style={styles.input}
            keyboardType="phone-pad"
            placeholderTextColor="#aaa"
          />
          <View style={styles.button}>
            <Button title="Send OTP" onPress={sendOtp} color="#1e88e5" />
          </View>
        </>
      ) : (
        <>
          <TextInput
            value={code}
            onChangeText={setCode}
            placeholder="Enter OTP"
            style={styles.input}
            keyboardType="number-pad"
            placeholderTextColor="#aaa"
          />
          <View style={styles.button}>
            <Button title="Verify Code" onPress={verifyCode} color="#43a047" />
          </View>
        </>
      )}
    </View>
  );
};

export default PhoneAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  heading: {
    fontSize: 22,
    fontFamily: Fonts.Boldd,
    marginBottom: 24,
    textAlign: 'center',
    color: colors.textColorWhite,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.labelColor,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.inputBackground,
    marginBottom: 16,
    color: colors.textColorWhite,
    fontFamily: Fonts.Regularr,
  },
  button: {
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
});
