import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';

import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const Signupin = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('signIn');

  const [emaill, setEmail] = useState('');
  const [passwordd, setPassword] = useState('');

  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
 
const { email, password } = useSelector((state) => state.user);

  const auth = getAuth();
  firebase.auth().settings.appVerificationDisabledForTesting = true; // for emulator only

  const sendOtp = async () => {
    if (!phone) return Alert.alert('Validation', 'Please enter phone number');
    try {
      const result = await signInWithPhoneNumber(auth, phone);
      setConfirmResult(result);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const verifyCode = async () => {
    if (!code) return Alert.alert('Validation', 'Enter the OTP code');
    try {
      await confirmResult.confirm(code);
      Alert.alert('Verified!', 'Phone number verified');
      navigation.replace('UserProfile');
    } catch (error) {
      Alert.alert('Invalid Code', error.message);
    }
  };
  const handleSignIn = () => {
  if (!emaill || !passwordd) {
    Alert.alert('Error', 'Please enter both email and password');
    return;
  }

  if (emaill === email && passwordd === password) {
    Alert.alert('Success', 'Logged in successfully');
    navigation.replace('EditProfile'); // Or wherever you want to go
  } else {
    Alert.alert('Error', 'Invalid email or password');
  }
};

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../assets/vrr/vr_logo.png')}
        style={styles.logo}
      />

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab('signIn')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'signIn' && styles.activeTabText,
            ]}
          >
            SIGN IN
          </Text>
          {activeTab === 'signIn' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab('signUp')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'signUp' && styles.activeTabText,
            ]}
          >
            SIGN UP
          </Text>
          {activeTab === 'signUp' && <View style={styles.activeUnderline} />}
        </TouchableOpacity>
      </View>

      {/* Sign In UI */}
      {activeTab === 'signIn' ? (
        <>
          <TextInput
            placeholder="Email / Mobile Number"
            placeholderTextColor="#777"
            style={styles.input}
            value={emaill}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={passwordd}
            onChangeText={setPassword}
          />

          <TouchableOpacity
  activeOpacity={0.8}
  style={[
    styles.signInButton,
    !(emaill && passwordd) && styles.disabledButton,
  ]}
  disabled={!(emaill && passwordd)}
  onPress={handleSignIn}
>
  <Text style={styles.signInText}>Sign In</Text>
</TouchableOpacity>


          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          {/* Sign Up UI with OTP */}
          {!confirmResult ? (
            <>
              <TextInput
                placeholder="Phone Number (e.g. +91xxxxxxxxxx)"
                placeholderTextColor="#777"
                style={styles.input}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={sendOtp}
                style={[
                  styles.signInButton,
                  !phone && styles.disabledButton,
                ]}
                disabled={!phone}
              >
                <Text style={styles.signInText}>Send OTP</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Enter OTP"
                placeholderTextColor="#777"
                style={styles.input}
                keyboardType="number-pad"
                value={code}
                onChangeText={setCode}
              />

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={verifyCode}
                style={[
                  styles.signInButton,
                  !code && styles.disabledButton,
                ]}
                disabled={!code}
              >
                <Text style={styles.signInText}>Verify OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Signupin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  logo: {
    width: 200,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  tabContainer: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-around',
    marginBottom: 30,
    position: 'relative',
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667',
  },
  activeTabText: {
    color: '#fff',
  },
  activeUnderline: {
    height: 2,
    backgroundColor: '#1679F8',
    marginTop: 4,
    width: 50,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#121F35',
    borderRadius: 6,
    paddingHorizontal: 15,
    color: '#fff',
    marginBottom: 20,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#1C396A',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  signInText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#1679F8',
    fontSize: 16,
    marginTop: 10,
  },
});
