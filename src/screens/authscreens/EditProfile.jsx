import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { setUserProfiles } from '../../redux/Slices/userSlices';
import { Fonts } from '../../constants/fonts';
import { colors } from '../../constants/Colors';

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 40;

const defaultAvatars = [
  require('../../../assets/avtar/avtarr.png'),
  require('../../../assets/avtar/avtarr.png'),
  require('../../../assets/avtar/avtarr.png'),
];

const EditProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, profiles } = useSelector((state) => state.user);

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
    const updated = [...profiles, profile];
    dispatch(setUserProfiles(updated));
  };

  const handleProfileClick = (profile) => {
    navigation.navigate('Geners');
  };

  // Always show 5 slots: fill with profiles, then one plus, then empty slots
  let displayData = [...profiles];
  if (displayData.length < 5) {
    // Add one plus button
    displayData.push({ isAddButton: true });
    // Fill the rest with empty slots
    while (displayData.length < 5) {
      displayData.push({ isEmpty: true });
    }
  } else if (displayData.length > 5) {
    displayData = displayData.slice(0, 5);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who is Watching?</Text>

      <FlatList
        data={displayData}
        keyExtractor={(_, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.profileGrid}
        columnWrapperStyle={styles.row}
        renderItem={({ item, index }) => {
       
          const isFifth = index === 4;
          const itemStyle = isFifth
            ? [styles.profileItem, styles.centeredFifthItem]
            : styles.profileItem;

          if (item.isAddButton) {
            return (
              <TouchableOpacity
                style={itemStyle}
                onPress={handleAddProfile}
              >
                <View style={styles.addCircle}>
                  <Text style={styles.addPlus}>+</Text>
                </View>
                <Text style={styles.addNewText}>Add New</Text>
              </TouchableOpacity>
            );
          }

          if (item.isEmpty) {
            return <View style={itemStyle} />;
          }

          return (
            <TouchableOpacity
              style={itemStyle}
              onPress={() => handleProfileClick(item)}
            >
              <Image
                source={
                  typeof item.image === 'string'
                    ? { uri: item.image }
                    : item.image
                }
                style={styles.avatar}
              />
              <Text style={styles.profileName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />

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
    backgroundColor: colors.appBackground,
    paddingTop: 100,
    paddingHorizontal: 20,
    fontFamily: Fonts.Mediumm
  },
  title: {
    fontSize: 22,
    color: colors.textColorWhite,
    fontFamily: Fonts.Boldd,
    textAlign: 'center',
    marginBottom: 40,
  },
  profileGrid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  profileItem: {
    width: itemWidth,
    alignItems: 'center',
    marginBottom: 30,
  },
  centeredFifthItem: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 8,
  },
  profileName: {
    color: colors.textColorWhite,
    fontSize: 14,
    fontFamily: Fonts.Mediumm,
    textAlign: 'center',
  },
  addCircle: {
    width: 100,
    height: 100,
    borderRadius: 35,
    backgroundColor: colors.tabBarColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 32,
    color: colors.appButton,
    fontFamily: Fonts.Boldd,
  },
  addNewText: {
    color: colors.textColorBlue,
    marginTop: 6,
    fontSize: 14,
    fontFamily: Fonts.Mediumm,
  },
  editButton: {
    backgroundColor: colors.appButton,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  editButtonText: {
    color: colors.textColorWhite,
    fontFamily: Fonts.Boldd,
    fontSize: 16,
  },
});