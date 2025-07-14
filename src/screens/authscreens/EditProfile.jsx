import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import {
  setUserProfiles,
} from '../../redux/Slices/userSlices';

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 40;

const defaultAvatars = [
  require('../../../assets/avtar/avtarr.png'),
  require('../../../assets/avtar/avtarr.png'),
  require('../../../assets/avtar/avtarr.png'),
];

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, profileImage, profiles } = useSelector((state) => state.user);

  const handleAddProfile = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        const newProfile = {
          name,
          image: defaultAvatars[Math.floor(Math.random() * defaultAvatars.length)],
        };
        updateProfiles(newProfile);
      } else if (response.assets && response.assets.length > 0) {
        const newProfile = {
          name,
          image: { uri: response.assets[0].uri },
        };
        updateProfiles(newProfile);
      }
    });
  };

  const updateProfiles = (profile) => {
    if (profiles.length >= 5) {
      Alert.alert('Limit Reached', 'You can only create up to 5 profiles.');
      return;
    }

    const updated = [ profile,...profiles];
    dispatch(setUserProfiles(updated));
  };

  const handleProfileClick = (profile) => {
    navigation.navigate('Geners');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who is Watching?</Text>

      {/* Sub Profiles */}
      <ScrollView contentContainerStyle={styles.profileGrid}>
        {Array.from({ length: 5 }).map((_, index) => {
          const item = profiles[index];
          const isLastCentered = index === 4;

          if (item) {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.profileItem, isLastCentered && styles.centerItem]}
                onPress={() => handleProfileClick(item)}
              >
                <Image source={item.image} style={styles.avatar} />
                <Text style={styles.profileName}>{item.name}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                key={index}
                style={[styles.profileItem, isLastCentered && styles.centerItem]}
                onPress={handleAddProfile}
              >
                <View style={styles.addCircle}>
                  <Text style={styles.addPlus}>+</Text>
                </View>
                <Text style={styles.addNewText}>Add New</Text>
              </TouchableOpacity>
            );
          }
        })}
      </ScrollView>

      {/* Edit Button */}
      <View style={{ marginTop: 10, marginBottom: 30 }}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => navigation.navigate('UserEdit')}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  profileGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  profileItem: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 30,
  },
  centerItem: {
    alignSelf: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  profileName: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  addCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0d1a2f',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 32,
    color: '#1679F8',
  },
  addNewText: {
    color: '#1679F8',
    marginTop: 6,
    fontSize: 14,
  },
  editButton: {
    backgroundColor: '#1679F8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
