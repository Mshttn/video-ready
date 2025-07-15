import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList
} from 'react-native';
import { colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';
import { useDispatch } from 'react-redux';
import { addDownload } from '../../redux/Slices/downloadSlice';
import Icon from 'react-native-vector-icons/Feather'

const MovieDetails = () => {
  const [paused, setPaused] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch=useDispatch();
    const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const { id = '0', name = 'Unknown Movie', image = require('../../../assets/series/panchayat.png') } = route.params || {};

  const togglePlayback = () => {
    setPaused(prev => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topHeader}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} />
      </View>

      <View style={styles.bannerWrapper}>
        <Image source={image} style={styles.bannerImage} />
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{name}</Text>
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
          <Text style={styles.rating}>8.6 <Image source={require('../../../assets/Downloading/imdb.png')} /></Text>
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
    <TouchableOpacity
  style={styles.iconTextButton}
  onPress={() => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      dispatch(addDownload({
        id: id || Date.now().toString(), 
        title: name,
        genres: 'Action, Thriller, Suspense',
        thumbnail: image,
      }));
    }, 5000);
  }}
>
  <Image
    source={
      isDownloading
        ? require('../../../assets/Downloading/downloading.png')
        :require('../../../assets/Sidebar/watch_history_icon-1.png')  
    }
    style={styles.icon}
  />
  <Text style={styles.iconLabel}>
    {isDownloading ? 'Downloading...' : 'Downloaded'}
  </Text>
</TouchableOpacity>
        </View>
      </View>

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

      <ScrollView horizontal style={styles.tabs}>
        {['Season 1', 'Season 2', 'Season 3', 'Season 4'].map((season, i) => (
          <TouchableOpacity key={i} style={styles.tab}>
            <Text style={[styles.tabText, i === 0 && styles.activeTab]}>{season}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
  container: { backgroundColor: colors.appBackground, flex: 1 },
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
  playIcon: { fontSize: 30, color: colors.textColorWhite },

  infoSection: { padding: 15 },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { color: colors.textColorWhite, fontSize: 18, fontFamily: Fonts.Boldd },
  sideButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  sideButton: {
    backgroundColor: colors.appButton,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  sideButtonText: {
    color: colors.textColorWhite,
    fontSize: 12,
    fontFamily: Fonts.Mediumm,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  rating: {
    color: colors.descriptionTextColor,
    marginRight: 8,
  },
  duration: { 
    color: colors.descriptionTextColor,
  },
  genre: { 
    color: colors.descriptionTextColor,
    marginBottom: 5, 
    fontFamily: Fonts.Mediumm,
  },
  description: { 
    color: colors.descriptionTextColor, 
    fontFamily: Fonts.Regularr,
  },
  more: { 
    color: colors.textColorBlue,
    fontFamily: Fonts.Mediumm,
  },
  label: { 
    color: colors.labelColor,
    marginTop: 2, 
    fontFamily: Fonts.Mediumm,
  },
  value: { 
    color: colors.textColorWhite,
    fontFamily: Fonts.Mediumm,
  },
  actions: { 
    flexDirection: 'row',
    gap: 20, 
    marginTop: 10,
  },

  castSection: { 
    paddingHorizontal: 15,
    marginTop: 10,
  },
  sectionTitle: { 
    color: colors.textColorWhite,
    fontSize: 16,
    fontFamily: Fonts.Boldd,
    marginBottom: 8,
  },
  castItem: { 
    alignItems: 'center',
    marginRight: 12,
  },
  castImage: { 
    width: 60, 
    height: 60, 
    borderRadius: 30,
  },
  castName: { 
    color: colors.textColorWhite,
    fontSize: 12, 
    marginTop: 4,
    fontFamily: Fonts.Mediumm,
  },

  tabs: { 
    paddingHorizontal: 15,
    marginTop: 15,
  },
  tab: { 
    marginRight: 10,
  },
  tabText: { 
    color: colors.descriptionTextColor, 
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    fontFamily: Fonts.Mediumm,
  },
  activeTab: { 
    backgroundColor: colors.appButton,
    color: colors.textColorWhite, 
    fontFamily: Fonts.Boldd,
  },

  episodeList: {
     paddingHorizontal: 15,
      marginTop: 10 
    },
  episodeCard: {
     marginRight: 10
    },
  episodeImage: { 
    width: 100,
     height: 150,
      borderRadius: 8 },
  episodeLabel: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: colors.textColorWhite,
    padding: 2,
    fontSize: 12,
    fontFamily: Fonts.Mediumm,
  },

  recommend: { marginTop: 20, paddingHorizontal: 15 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  recommendImage: {
     width: 149, 
     height: 84, 
     borderRadius: 2,
      marginRight: 10 },
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
    color: colors.textColorWhite,
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
    marginRight: 20,
  },
  iconLabel: {
    color: colors.textColorWhite,
    fontSize: 13,
    marginLeft: 6,
    fontFamily: Fonts.Mediumm,
  },
});