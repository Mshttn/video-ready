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
  UserCircleIcon,
} from 'react-native-heroicons/outline';

const { width } = Dimensions.get('window');

const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch();
  const { profiles, favoriteGenres,profileImage} = useSelector((state) => state.user);

  const handleGenreRemove = (title) => {
    dispatch(removeGenre(title));
  };

  return (
    <View style={styles.container}>
      {/* Header row with logo + icons */}
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
  <Image source={{ uri: profileImage }} style={styles.profileIcon} />
</TouchableOpacity>

        </View>
      </View>

      {/* Back + Title */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'←'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Profiles</Text>
      </View>

      {/* Profiles */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.profileRow}
      >
        {profiles.map((profile, index) => (
          <View key={index} style={styles.profileItem}>
            <Image source={profile.image} style={styles.profileImage} />
            <Text style={styles.profileName}>{profile.name}</Text>
          </View>
        ))}

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

      {/* Edit button */}
      <TouchableOpacity
        onPress={() => navigation.navigate('EditProfile')}
        style={styles.editBtn}
      >
        <Text style={styles.editBtnText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Favorite Genres */}
      <Text style={styles.sectionTitle}>Favourite Genres</Text>
      <FlatList
        data={[
          ...favoriteGenres,
          ...(favoriteGenres.length < 5 ? [{ isAddButton: true }] : []),
        ]}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.genreList}
        renderItem={({ item }) => {
          if (item.isAddButton) {
            return (
              <TouchableOpacity
                style={styles.addGenreCard}
                onPress={() => navigation.navigate('Geners')}
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
    backgroundColor: '#0A0F1C',
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
    marginBottom: 10,
  },
  backArrow: {
    color: '#fff',
    fontSize: 26,
    marginRight: 120,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  profileName: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  addNew: {
    alignItems: 'center',
  },
  addCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222A35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPlus: {
    fontSize: 28,
    color: '#1679F8',
  },
  addText: {
    color: '#1679F8',
    marginTop: 4,
  },
  editBtn: {
    backgroundColor: '#1679F8',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  genreList: {
    paddingBottom: 40,
  },
  genreCard: {
    width: width / 3.3,
    backgroundColor: '#161B22',
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  genreImage: {
    width: '100%',
    height: 100,
  },
  genreName: {
    color: '#fff',
    textAlign: 'center',
    paddingVertical: 4,
    backgroundColor: '#161B22',
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
  borderColor: '#fff',
},
  addGenreCard: {
    width: width / 3.3,
    height: 130,
    backgroundColor: '#161B22',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  plusIcon: {
    fontSize: 30,
    color: '#1679F8',
  },
});
