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
} from 'react-native';

const { width } = Dimensions.get('window');

const Signupin = () => {
  const navigation=useNavigation();
  const [activeTab, setActiveTab] = useState('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('../../../assets/vrr/vr_logo.png')}
        style={styles.logo}
      />

      {/* Tab Bar */}
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

      {/* Conditional Form */}
      {activeTab === 'signIn' ? (
        <>
          <TextInput
            placeholder="Email / Mobile Number"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            secureTextEntry
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.forgotText}>Forgot Password</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#777"
            style={styles.input}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInText}>Continue</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>navigation.navigate('UserProfile')} style={styles.signInButton}>
            <Text style={styles.signInText}>nextpage</Text>
          </TouchableOpacity>
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
  signInText: {
    color: '#888',
    fontWeight: 'bold',
    fontSize: 16,
  },
  forgotText: {
    color: '#1679F8',
    fontSize: 16,
    marginTop: 10,
  },
});