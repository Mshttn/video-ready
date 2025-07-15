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
import { colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
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
  firebase.auth().settings.appVerificationDisabledForTesting = true;

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
      navigation.replace('EditProfile');
    } else {
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/vrr/vr_logo.png')}
        style={styles.logo}
      />

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

   
      {activeTab === 'signIn' ? (
        <>
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Email / Mobile Number</Text>
            <TextInput
              placeholder="Email / Mobile Number"
              placeholderTextColor={colors.placeholderTextColor}
              style={styles.input}
              value={emaill}
              onChangeText={setEmail}
            />
          </View>
          <View style={{ width: '100%' }}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Password"
              placeholderTextColor={colors.placeholderTextColor}
              secureTextEntry
              style={styles.input}
              value={passwordd}
              onChangeText={setPassword}
            />
          </View>

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
          {!confirmResult ? (
            <>
              <View style={{ width: '100%' }}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                  placeholder="Phone Number (e.g. +91xxxxxxxxxx)"
                  placeholderTextColor={colors.placeholderTextColor}
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
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
                placeholderTextColor={colors.placeholderTextColor}
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
    backgroundColor: colors.appBackground,
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
    fontFamily: Fonts.Mediumm,
    color: colors.labelColor,
  },
  activeTabText: {
    color: colors.textColorWhite,
    fontFamily: Fonts.Boldd,
  },
  activeUnderline: {
    height: 2,
    backgroundColor: colors.appButton,
    marginTop: 4,
    width: 50,
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: colors.inputBackground,
    borderRadius: 6,
    paddingHorizontal: 15,
    color: colors.textColorWhite,
    marginBottom: 20,
    fontFamily: Fonts.Regularr,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.appButton,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: colors.appButtonDisabled,
  },
  signInText: {
    color: colors.textColorWhite,
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: Fonts.Boldd,
  },
  forgotText: {
    color: colors.textColorBlue,
    fontSize: 16,
    marginTop: 10,
    fontFamily: Fonts.Mediumm,
  },
  label: {
    color: colors.labelColor,
    fontFamily: Fonts.Mediumm,
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 2,
  },
});
