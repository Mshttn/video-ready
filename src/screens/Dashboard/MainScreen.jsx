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
import { MagnifyingGlassIcon, UserIcon } from 'react-native-heroicons/solid';
import { BellIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';

const MainScreen = () => {
  const navigation = useNavigation();
  const {profileImage} =useSelector((state)=>state.user)

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
            <Image source={{uri:profileImage}} size={24} color='white' style={styles.avatar} />
          </TouchableOpacity>
        </View>
      </View>

   
      <ScrollView>
      
       <View style={styles.banner}>
  <Image
    source={require('../../../assets/morbius.jpg')}
    style={styles.bannerImage}
  />

  <View style={styles.bannerOverlay}>
    <Text style={styles.movieTitle}>Morbius</Text>

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
             
               <TouchableOpacity
                onPress={() => navigation.navigate('MovieDetails', { image: item })}
              >
               <Image source={item} style={styles.flashThumbnail} />
              </TouchableOpacity>
            )}
          />
        </View>

    
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
  height: 375,
  alignSelf: 'center',
  position: 'relative',
  marginBottom: 10,
},

bannerImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  borderRadius: 8,
},

bannerOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: 'flex-end',
  padding: 16,
  backgroundColor: 'rgba(0, 0, 0, 0.35)', // semi-transparent dark overlay
  borderRadius: 8,
},

movieTitle: {
  fontSize: 26,
  color: '#fff',
  fontWeight: 'bold',
  marginBottom: 10,
  textAlign:'center'
},

buttonRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: 10,
},

moreDetails: {
  color: '#aaa',
  fontSize: 14,
  marginHorizontal: 5,
},

watchButton: {
  backgroundColor: '#1679F8',
  paddingHorizontal: 16,
  height: 32,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 6,
},

watchButtonText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 14,
},

playlistRow: {
  flexDirection: 'row',
  alignItems: 'center',
  marginHorizontal: 5,
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
  color: '#ddd',
  fontSize: 14,
  textAlign: 'center',
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
