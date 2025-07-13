import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/solid';
import { BellIcon } from 'react-native-heroicons/outline';

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.icon}>
            <MagnifyingGlassIcon size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <BellIcon size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../../../assets/logo.png')} style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView>
        {/* Banner Section */}
        <View style={styles.banner}>
          <Image
            source={require('../../../assets/morbius.jpg')}
            style={styles.bannerImage}
          />
          <Text style={styles.movieTitle}>Morbius</Text>
          
          {/* Buttons Row */}
          <View style={styles.buttonRow}>
            <TouchableOpacity>
              <Text style={styles.moreDetails}>More details</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.watchButton}>
              <Text style={styles.watchButtonText}>▶ Watch Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.playlistRow}>
              <Image
                source={require('../../../assets/Downloading/playlist_add.png')}
                style={styles.playlistIcon}
              />
              <Text style={styles.addToPlaylist}>Add to playlist</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.genre}>Action | Thriller | Suspense</Text>
        </View>

        {/* Flash Channel Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Channel</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[
               require('../../../assets/series/squiddd.png'),
                require('../../../assets/series/kabir.png'),
           require('../../../assets/series/money.png'),
                 require('../../../assets/series/panchayat.png'),
                  require('../../../assets/series/panchayat.png'),
                   require('../../../assets/series/panchayat.png'),
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <Image source={item} style={styles.flashThumbnail} />
            )}
          />
        </View>

        {/* Stay at Home Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Stay at Home</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={[
              require('../../../assets/series/panchayat.png'),
                require('../../../assets/series/lapta.png'),
           require('../../../assets/series/money.png'),
                 require('../../../assets/series/panchayat.png'),
                  require('../../../assets/series/panchayat.png'),
                   require('../../../assets/series/panchayat.png'),
            ]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('MovieDetails', { image: item })}
              >
                <Image source={item} style={styles.stayThumbnail} />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 50,
  },
  logo: {
    width: 44,
    height: 44,
    resizeMode: 'contain',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },

  // Banner
  banner: {
    width: 375,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor:"#001122"
    
  },
  bannerImage: {
    width: 375,
    height: 220,
   
    resizeMode: 'cover',
  },
  movieTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
  },

  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: 12,
    paddingHorizontal: 10,
  },
  moreDetails: {
    color: '#aaa',
    fontSize: 14,
    margin:4
  },
  watchButton: {
    backgroundColor: '#1679F8',
    width: 129,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6, 
    margin:8
  },
  watchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin:4

  },
  playlistIcon: {
    width: 18,
    height: 18,
    tintColor: '#aaa',
    marginRight: 4,
  },
  addToPlaylist: {
    color: '#aaa',
    fontSize: 14,
  },
  genre: {
    color: '#888',
    fontSize: 14,
    marginTop: 5,
  },

  // Sections
  section: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  moreText: {
    color: '#1679F8',
    fontSize: 14,
  },

  flashThumbnail: {
    width: 148,
    height: 84,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#333',
  },
  stayThumbnail: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#333',
  },
});
