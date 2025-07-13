import { useNavigation } from '@react-navigation/native';
import React ,{useState} from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import Video from 'react-native-video';

const MovieDetails = () => {
     const [paused, setPaused] = useState(true); // Start paused
     const navigation = useNavigation();

  const togglePlayback = () => {
    setPaused(prev => !prev);
  };
  return (
    <ScrollView style={styles.container}>
      {/* Top Logo */}
      <View style={styles.topHeader}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      </View>

      {/* Top Banner */}
        <View style={styles.bannerWrapper}>
        <Video
          source={require('../../../assets/video/squid.mp4')}
          style={styles.bannerVideo}
          resizeMode="cover"
          repeat
          paused={paused}
        />
         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Text style={styles.backIcon}>←</Text>
  </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Text style={styles.playIcon}>{paused ? '▶' : '⏸'}</Text>
        </TouchableOpacity>
      </View>


      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
           <Text style={styles.title}>S1:E1:Squid Game</Text>
  <View style={styles.sideButtons}>
    <TouchableOpacity style={styles.iconButton}>
      <Image source={require('../../../assets/Downloading/share.png')} style={styles.icon} />
    </TouchableOpacity>
    <TouchableOpacity style={styles.iconButton}>
      <Image source={require('../../../assets/Downloading/heartt.png')} style={styles.icon} />
    </TouchableOpacity>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rating}>8.6 
            <Image source={require('../../../assets/Downloading/imdb.png')} />
          </Text>
          <Text style={styles.duration}>2h 37m</Text>
        </View>
        <Text style={styles.genre}>Action, Adventure, Fantasy</Text>
        <Text style={styles.description}>
          An idealistic FBI agent is enlisted Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut reiciendis assumenda quae iste similique ea expedita obcaecati vitae facere et mollitia unde laborum sapiente deleniti, autem quas necessitatibus libero? Tenetur?... <Text style={styles.more}>more</Text>
        </Text>
        <Text style={styles.label}>Director: <Text style={styles.value}>Denis Villenueve</Text></Text>
        <Text style={styles.label}>Country: <Text style={styles.value}>UK, USA</Text></Text>
        <Text style={styles.label}>Release: <Text style={styles.value}>2021</Text></Text>
<View style={styles.actions}>
  <TouchableOpacity style={styles.iconTextButton}>
    <Image source={require('../../../assets/Downloading/playlist_add.png')} style={styles.icon} />
    <Text style={styles.iconLabel}>Playlist</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.iconTextButton} onPress={()=>navigation.navigate('Download')}>
    <Image source={require('../../../assets/Downloading/downloading.png')} style={styles.icon} />
    <Text style={styles.iconLabel}>Downloading</Text>
  </TouchableOpacity>
</View>


      </View>

      {/* Cast Section */}
      <View style={styles.castSection}>
        <Text style={styles.sectionTitle}>Cast</Text>
        <FlatList
          horizontal
          data={['HoYeon', 'Lee', 'Yoo', 'Yoo-Mi', 'Manish']}
          renderItem={({ item }) => (
            <View style={styles.castItem}>
              <Image source={require('../../../assets/slidesss/Intro1.png')} style={styles.castImage} />
              <Text style={styles.castName}>{item}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Seasons Tabs */}
      <ScrollView horizontal style={styles.tabs}>
        {['Season 1', 'Season 2', 'Season 3', 'Season 4'].map((season, i) => (
          <TouchableOpacity key={i} style={styles.tab}>
            <Text style={[styles.tabText, i === 0 && styles.activeTab]}>{season}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Episode List */}
      <FlatList
        horizontal
        data={[1, 2, 3, 4]}
        renderItem={({ item }) => (
          <View style={styles.episodeCard}>
            <Image source={require('../../../assets/slidesss/Intro1.png')} style={styles.episodeImage} />
            <Text style={styles.episodeLabel}>E{item}</Text>
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsHorizontalScrollIndicator={false}
        style={styles.episodeList}
      />

      {/* Recommended Section */}
      <View style={styles.recommend}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Series</Text>
          <Text style={styles.more}>More</Text>
        </View>
        <FlatList
          horizontal
          data={[1, 2, 3]}
          renderItem={() => (
            <Image source={require('../../../assets/slidesss/Intro1.png')} style={styles.recommendImage} />
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  container: { backgroundColor: '#061124', flex: 1 },
  topHeader: {
    
    paddingTop: 45,
    paddingBottom: 10,
  },
  logo: {
    width: 70,
    height: 40,
    resizeMode: 'contain',
  },

  bannerWrapper: { position: 'relative' },
  bannerImage: { width: '100%', height: 200 },
  playButton: { position: 'absolute', top: '45%', left: '45%' },
  playIcon: { fontSize: 30, color: '#fff' },

  infoSection: { padding: 15 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  sideButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sideButton: {
    backgroundColor: '#1679F8',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sideButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },

  row: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: 5,
},
rating: {
  color: '#ccc',
  marginRight: 8, // 👈 adds space between IMDb and duration
},

  duration: { color: '#ccc' },
  genre: { color: '#aaa', marginBottom: 5 },
  description: { color: '#ccc' },
  more: { color: '#1679F8' },
  label: { color: '#888', marginTop: 2 },
  value: { color: '#fff' },
  actions: { flexDirection: 'row', gap: 20, marginTop: 10 },

  castSection: { paddingHorizontal: 15, marginTop: 10 },
  sectionTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  castItem: { alignItems: 'center', marginRight: 12 },
  castImage: { width: 60, height: 60, borderRadius: 30 },
  castName: { color: '#fff', fontSize: 12, marginTop: 4 },

  tabs: { paddingHorizontal: 15, marginTop: 15 },
  tab: { marginRight: 10 },
  tabText: { color: '#aaa', paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20 },
  activeTab: { backgroundColor: '#1679F8', color: '#fff' },

  episodeList: { paddingHorizontal: 15, marginTop: 10 },
  episodeCard: { marginRight: 10 },
  episodeImage: { width: 120, height: 90, borderRadius: 8 },
  episodeLabel: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'white',
    padding: 2,
    fontSize: 12,
  },

  recommend: { marginTop: 20, paddingHorizontal: 15 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recommendImage: { width: 140, height: 90, borderRadius: 6, marginRight: 10 },
  bannerVideo: {
  width: '100%',
  height: 200,
  borderRadius: 8,
},
backButton: {
  position: 'absolute',
  top: 15,
  left: 15,
 
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 20,
  zIndex: 2,
},
backIcon: {
  color: '#fff',
  fontSize: 18,
},
iconButton: {
 
  borderRadius: 6,
  padding: 6,
  marginLeft: 8,
},

icon: {
  width: 18,
  height: 18,
  resizeMode: 'contain',
},
iconTextButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginRight: 20, // spacing between two buttons
},
iconLabel: {
  color: '#fff',
  fontSize: 13,
  marginLeft: 6, // spacing between icon and text
},

});
