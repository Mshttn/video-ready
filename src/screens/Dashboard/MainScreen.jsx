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
import { MagnifyingGlassIcon, PauseIcon, PlayIcon, UserIcon } from 'react-native-heroicons/solid';
import { BellIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { useSelector } from 'react-redux';
import { colors } from '../../constants/Colors';
import { Fonts } from '../../constants/fonts';


const flashChannelData = [
  {
    id: '1',
    name: 'Squid Game',
    image: require('../../../assets/series/squiddd.png'),
  },
  {
    id: '2',
    name: 'Kabir Singh',
    image: require('../../../assets/series/kabir.png'),
  },
  {
    id: '3',
    name: 'Money Heist',
    image: require('../../../assets/series/money.png'),
  },
  {
    id: '4',
    name: 'Panchayat',
    image: require('../../../assets/series/panchayat.png'),
  },
  {
    id: '5',
    name: 'Breaking Bad',
    image: require('../../../assets/series/panchayat.png'),
  },
  {
    id: '6',
    name: 'Dark',
    image: require('../../../assets/series/panchayat.png'), 
  },
];




const MainScreen = () => {
  const navigation = useNavigation();
  const {profileImage} =useSelector((state)=>state.user)

  return (
    <View style={styles.container}>

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
    source={require('../../../assets/movbanner.png')}
    style={styles.bannerImage}
  />

  <View style={styles.bannerOverlay}>
    <View style={styles.gradientLayer1} />
    <View style={styles.gradientLayer2} />
    <View style={styles.gradientLayer3} />
    <View style={styles.gradientLayer4} />
    <View style={styles.gradientLayer5} />
    <View style={styles.bannerContent}>
      <Text style={styles.movieTitle}>Morbius</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity>
          <View style={styles.moreDetailsRow}>
            <Image
              source={require('../../../assets/info/info.png')}
              style={styles.moreicon}
            />
            <Text style={styles.moreDetails}>More details</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.watchButton}>
          <View style={styles.watchButtonContent}>
            <PlayIcon size={16} color="white" style={styles.playIcon} />
            <Text style={styles.watchButtonText}>Watch Now</Text>
          </View>
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
</View>

       
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Flash Channel</Text>
            <TouchableOpacity>
              <Text style={styles.moreText}>More</Text>
            </TouchableOpacity>
          </View>
          
         <FlatList
  data={flashChannelData}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {
        id: item.id,
        name: item.name,
        image: item.image,
      })}
    >
      <Image source={item.image} style={styles.flashThumbnail} />
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
  data={flashChannelData}
  horizontal
  showsHorizontalScrollIndicator={false}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetails', {
        id: item.id,
        name: item.name,
        image: item.image,
      })}
    >
      <Image source={item.image} style={styles.stayThumbnail} />
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
    backgroundColor: colors.appBackground,
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
  borderRadius: 8,
},
gradientLayer1: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0)',
},
gradientLayer2: {
  position: 'absolute',
  top: '20%',
  left: 0,
  right: 0,
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
},
gradientLayer3: {
  position: 'absolute',
  top: '40%',
  left: 0,
  right: 0,
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
},
gradientLayer4: {
  position: 'absolute',
  top: '60%',
  left: 0,
  right: 0,
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
},
gradientLayer5: {
  position: 'absolute',
  top: '80%',
  left: 0,
  right: 0,
  height: '20%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
},
bannerContent: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  justifyContent: 'flex-end',
},

movieTitle: {
  fontSize: 26,
  color: colors.textColorWhite,
  fontFamily: Fonts.Boldd,
  marginBottom: 10,
  textAlign: 'center',
  alignSelf: 'center',
},

buttonRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  marginBottom: 10,
},

moreDetails: {
  color: colors.descriptionTextColor,
  fontSize: 10,
  marginHorizontal: 5,
  fontFamily: Fonts.Mediumm,
},

watchButton: {
  backgroundColor: colors.appButton,
  paddingHorizontal: 16,
  paddingVertical: 8,
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 6,
},
watchButtonContent: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
},
playIcon: {
  marginRight: 4,
},
watchButtonText: {
  color: colors.textColorWhite,
  fontFamily: Fonts.Boldd,
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
moreicon:{
   width: 18,
  height: 18,
  tintColor: '#aaa',
 

},

addToPlaylist: {
  color: colors.descriptionTextColor,
  fontSize: 10,
  fontFamily: Fonts.Mediumm,
},

genre: {
  color: colors.textColorWhite,
  fontSize: 14,
  textAlign: 'center',
  fontFamily: Fonts.Mediumm,
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
    color: colors.textColorWhite,
    fontFamily: Fonts.Boldd,
  },
  moreText: {
    color: colors.textColorBlue,
    fontSize: 14,
    fontFamily: Fonts.Mediumm,
  },

  flashThumbnail: {
    width: 148,
    height: 84,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: colors.tabBarColor,
  },
  stayThumbnail: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
    resizeMode:'cover',
    backgroundColor: colors.tabBarColor,
  },
  moreDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
