import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useDispatch } from 'react-redux';
import { setUserName, setUserCredentials } from '../../redux/Slices/userSlices';

const UserProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    
    dispatch(setUserName(trimmedName));
    dispatch(setUserCredentials({ email: trimmedEmail, password }));

   
    navigation.navigate('EditProfile');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
        keyboardVerticalOffset={60}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>You are almost done</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Please enter your name, email and password to{'\n'}create your profile.
        </Text>

        {/* Form */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.label}>Enter your name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Enter your email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            placeholderTextColor="#777"
            autoCapitalize="none"
           
          />

          <Text style={styles.label}>Create new password</Text>
          <TextInput
           style={styles.input}
  secureTextEntry
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  placeholderTextColor="#777"
  textContentType="newPassword"
  autoComplete="password-new"
          />

          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="Confirm Password"
            placeholderTextColor="#777"
          />
        </ScrollView>

        {/* Sign Up Button */}
        <TouchableOpacity onPress={handleSignUp} style={styles.signupButton}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 30,
  },
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#121F35',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#fff',
  },
  signupButton: {
    backgroundColor: '#1679F8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
