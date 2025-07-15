import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  launchCamera,
} from 'react-native-image-picker';
import { CameraIcon } from 'react-native-heroicons/solid';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../redux/Slices/userSlices'; 

const DrawerItem = ({ image, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={image} style={styles.iconImage} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawer = ({ navigation }) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] = useState(null);
  const name = useSelector((state) => state.user.name);
  const dp =useSelector((state)=>state.user.profileImage)

  const pickImage = () => {
    Alert.alert(
      'Select Image',
      'Choose an image from gallery or open camera',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({ mediaType: 'photo' }, (result) => {
              if (!result.didCancel && result.assets?.length > 0) {
                setAvatar(result.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary({ mediaType: 'photo' }, (result) => {
              if (!result.didCancel && result.assets?.length > 0) {
                setAvatar(result.assets[0].uri);
              }
            });
          },
        },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

const handleSignOut = () => {
  Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Sign Out',
     onPress: () => {
  dispatch(clearUser());

navigation.replace('Stacknavigation', {
  screen: 'Signupin',
});
}
    },
  ]);
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.avatarSection} onPress={pickImage}>
         <Image
  source={
    avatar
      ? { uri: avatar }
      : dp
        ? { uri: dp }
        : require('../../assets/series/lapta.png')
  }
  style={styles.avatar}
/>
          <View style={styles.cameraIcon}>
            <CameraIcon size={16} color="#000" />
          </View>
          <Text style={styles.name}>{name || 'Guest'}</Text>
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>

      {/* Drawer Items */}
      <DrawerItem image={require('../../assets/Sidebar/myaccount.png')} label="My Account" />
      <DrawerItem image={require('../../assets/Sidebar/settings_icon.png')} label="Settings" />
      <DrawerItem image={require('../../assets/Sidebar/my_profiles_icon.png')} 
       onPress={() =>
    navigation.navigate('MovieStack', {
      screen: 'Myprofile',
    })
  }
       label="My Profiles" />
      <DrawerItem image={require('../../assets/Sidebar/my_devices_icon.png')} label="My Devices" />
       <View style={styles.divider} />
      <DrawerItem image={require('../../assets/Sidebar/giftcode_voucher_icon.png')} label="Giftcode / Voucher" />
      <DrawerItem image={require('../../assets/Sidebar/my_transaction_icon.png')} label="My Transaction" />
       <View style={styles.divider} />
      <DrawerItem image={require('../../assets/Sidebar/my_playlist.png')} label="My Playlist" />
      <DrawerItem image={require('../../assets/Sidebar/watch_history_icon.png')} label="Watch History" />
     <DrawerItem
  image={require('../../assets/Sidebar/watch_history_icon-1.png')}
  label="Downloaded Videos"
  onPress={() =>
    navigation.navigate('MovieStack', {
      screen: 'Download',
    })
  }
/>
      <DrawerItem image={require('../../assets/Sidebar/smart_tv_quick_login_icon.png')} label="Smart TV Quick Login" />

      {/* ✅ Sign Out button */}
      <DrawerItem
        image={require('../../assets/Sidebar/sign_out_icon.png')}
        label="Sign Out"
        onPress={handleSignOut}
      />
    </ScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001122',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    paddingTop: 40,
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: 12,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    left: 42,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    elevation: 5,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  label: {
    color: '#fff',
    marginLeft: 20,
    fontSize: 16,
  },
});
