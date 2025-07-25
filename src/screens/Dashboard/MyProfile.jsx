import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeGenre } from '../../redux/Slices/userSlices';
import {
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
} from 'react-native-heroicons/outline';
import { colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profiles, favoriteGenres, selectedProfile } = useSelector((state) => state.user);

  const handleGenreRemove = (title) => {
    dispatch(removeGenre(title));
  };

  const selectProfile = useSelector((state) => state.user.selectedProfile);

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.headerRow}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <View style={styles.iconGroup}>
          <TouchableOpacity style={styles.icon}>
            <MagnifyingGlassIcon size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <BellIcon size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image
              source={
                selectedProfile?.image
                  ? typeof selectedProfile.image === 'string'
                    ? { uri: selectedProfile.image }
                    : selectedProfile.image
                  : require('../../../assets/avtar/avtarr.png')
              }
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profiles</Text>
      </View>

      {/* Profile List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.profileRow}
      >
       {profiles.slice(0, 5).map((profile, index) => {
  const isActive =
    selectedProfile?.name === profile.name &&
    selectedProfile?.image === profile.image;

  return (
    <View
      key={index}
      style={[
        styles.profileItem,
        isActive && styles.activeProfileItem,
      ]}
    >
      <Image
        source={
          typeof profile.image === 'string'
            ? { uri: profile.image }
            : profile.image
        }
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>{profile.name}</Text>
    </View>
  );
})}

        {profiles.length < 5 && (
          <TouchableOpacity
            onPress={() => navigation.navigate('UserEdit')}
            style={styles.addNew}
          >
            <View style={styles.addCircle}>
              <Text style={styles.addPlus}>+</Text>
            </View>
            <Text style={styles.addText}>Add New</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Edit Profile Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('MyprofileEdit')}
        style={styles.editBtn}
      >
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      <View style={styles.divider} />

      {/* Favorite Genres */}
      <Text style={styles.sectionTitle}>Favourite Genres</Text>
      <FlatList
        data={[
          ...favoriteGenres,
          ...(favoriteGenres.length < 5 ? [{ isAddButton: true }] : []),
        ]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 16, gap: 4 }}
        contentContainerStyle={styles.genreList}
        renderItem={({ item }) => {
          if (item.isAddButton) {
            return (
              <TouchableOpacity
                style={styles.addGenreCard}
                onPress={() => navigation.navigate('EditGenres')}
              >
                <Text style={styles.plusIcon}>+</Text>
              </TouchableOpacity>
            );
          }

          return (
            <View style={styles.genreCard}>
              <Image source={{ uri: item.image }} style={styles.genreImage} />
              <TouchableOpacity
                style={styles.removeIcon}
                onPress={() => handleGenreRemove(item.title)}
              >
                <XMarkIcon color="#fff" size={16} />
              </TouchableOpacity>
              <Text style={styles.genreName}>{item.title}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backArrow: {
    color: colors.textColorWhite,
    fontSize: 26,
    marginRight: 120,
  },
  headerTitle: {
    color: colors.textColorWhite,
    fontSize: 20,
    fontFamily: Fonts.Boldd,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginVertical: 16,
  },
  profileItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  activeProfileItem: {
  //  borderWidth: 1,
  // borderColor: colors.appButton,
  // padding: 4,
  // borderRadius: 40,
  shadowColor: '#fff',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 9,

  
   
   
    
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  activeProfileImage: {
    borderColor: colors.appButton,
    borderWidth: 2,
  },
  profileName: {
    color: colors.textColorWhite,
    fontSize: 14,
    marginTop: 4,
    fontFamily: Fonts.Mediumm,
  },
  addNew: {
    alignItems: 'center',
  },
  addCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.tabBarColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 28,
    color: colors.appButton,
    fontFamily: Fonts.Boldd,
  },
  addText: {
    color: colors.textColorBlue,
    marginTop: 4,
    fontFamily: Fonts.Mediumm,
  },
  editBtn: {
    alignItems: 'center',
    marginBottom: 20,
  },
  editBtnText: {
    color: colors.textColorWhite,
    fontSize: 14,
    fontFamily: Fonts.Boldd,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginBottom: 16,
  },
  sectionTitle: {
    color: colors.textColorWhite,
    fontSize: 18,
    fontFamily: Fonts.Boldd,
    marginBottom: 12,
  },
  genreList: {
    paddingBottom: 40,
  },
  genreCard: {
    width: 108,
    height: 132,
    backgroundColor: colors.tabBarColor,
    borderRadius: 2,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 9,
  },
  genreImage: {
    width: '100%',
    height: 100,
  },
  genreName: {
    color: colors.textColorWhite,
    textAlign: 'center',
    fontFamily: Fonts.Mediumm,
    paddingVertical: 4,
  },
  removeIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#000a',
    borderRadius: 10,
    padding: 2,
    zIndex: 10,
  },
  profileIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.textColorWhite,
  },
  addGenreCard: {
    width: width / 3.3,
    height: 130,
    backgroundColor: colors.tabBarColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusIcon: {
    fontSize: 30,
    color: colors.appButton,
    fontFamily: Fonts.Boldd,
  },
});
