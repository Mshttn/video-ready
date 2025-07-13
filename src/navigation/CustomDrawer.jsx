import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { CameraIcon } from 'react-native-heroicons/solid';

const DrawerItem = ({ image, label, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <Image source={image} style={styles.iconImage} />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const CustomDrawer = ({ navigation }) => {
  const [avatar, setAvatar] = useState(null);

  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo' });

    if (!result.didCancel && result.assets && result.assets.length > 0) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Avatar with camera icon */}
      <View style={styles.avatarWrapper}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={avatar ? { uri: avatar } : require('../../assets/series/lapta.png')}
            style={styles.avatar}
          />
          <CameraIcon size={18}
            source={require('../../assets/series/lapta.png')}
            style={styles.cameraIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.name}>{"manish"}</Text>

      <DrawerItem image={require('../../assets/Sidebar/myaccount.png')} label="My Account" />
      <DrawerItem image={require('../../assets/Sidebar/settings_icon.png')} label="Settings" />
      <DrawerItem image={require('../../assets/Sidebar/my_profiles_icon.png')} label="My Profiles" />
      <DrawerItem image={require('../../assets/Sidebar/my_devices_icon.png')} label="My Devices" />
      <DrawerItem image={require('../../assets/Sidebar/giftcode_voucher_icon.png')} label="Giftcode / Voucher" />
      <DrawerItem image={require('../../assets/Sidebar/my_transaction_icon.png')} label="My Transaction" />
      <DrawerItem image={require('../../assets/Sidebar/my_playlist.png')} label="My Playlist" />
      <DrawerItem image={require('../../assets/Sidebar/watch_history_icon.png')} label="Watch History" />
      <DrawerItem image={require('../../assets/home.png')} label="Downloaded Videos" />
      <DrawerItem image={require('../../assets/Sidebar/smart_tv_quick_login_icon.png')} label="Smart TV Quick Login" />
      <DrawerItem image={require('../../assets/Sidebar/sign_out_icon.png')} label="Sign Out" />
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
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'cover',
    borderWidth: 2,
    borderColor: '#fff',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 90 / 2 - 20,
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
    tintColor: '#000',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
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
