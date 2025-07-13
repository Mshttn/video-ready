import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const onboardingSlides = [
  {
    key: 'slide1',
    background: require('../../../assets/slidesss/Intro1.png'),
    headline: 'WATCH',
    tagline: 'your favourite shows and movies',
    note: 'Watch on Mobile, Smart TV and more',
    cta: 'GET ENTERTAINED',
  },
  {
    key: 'slide2',
    background: require('../../../assets/slidesss/Intro1.png'),
    headline: 'STREAM',
    tagline: 'Anywhere on',
    tagline2: '5 devices, 2 concurrently',
    note: 'Watch on Mobile, Smart TV and more',
    cta: 'GET ENTERTAINED',
  },
    {
    key: 'slide3',
    background: require('../../../assets/slidesss/Intro1.png'),
    headline: 'STREAM',
    tagline: 'Anywhere on',
    tagline2: '5 devices, 2 concurrently',
    note: 'Watch on Mobile, Smart TV and more',
    cta: 'GET ENTERTAINED',
  },
];

const Crousl = () => {
    const navigation= useNavigation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const listRef = useRef(null);

  const Slide = ({ item }) => (
    <SafeAreaView>

   
    <View style={styles.slide}>
      {/* Top Half - Image */}
      <View style={styles.imageContainer}>
        <Image source={item.background} style={styles.image} resizeMode="cover" />
      </View>

      {/* Bottom Half - Overlay */}
      <View style={styles.overlayContainer}>
        <Image source={require('../../../assets/vrr/vr_logo2x.png')} style={styles.appLogo} />
        <Text style={styles.heading}>{item.headline}</Text>
        <View style={styles.taglineContainer}>
          <Text style={styles.tagline}>{item.tagline}</Text>
          {item.tagline2 && <Text style={styles.tagline}>{item.tagline2}</Text>}
        </View>
        <Text style={styles.note}>{item.note}</Text>

        <View style={styles.dotWrapper}>
          {onboardingSlides.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, currentSlide === idx && styles.activeDot]}
            />
          ))}
        </View>

        <TouchableOpacity onPress={()=>navigation.navigate('Signupin')} style={styles.ctaButton}>
          <Text style={styles.ctaText}>{item.cta}</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.skipBtn}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
     </SafeAreaView>
  );

  return (
    <FlatList
      ref={listRef}
      data={onboardingSlides}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <Slide item={item} />}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onScroll={(e) => {
        const offsetX = e.nativeEvent.contentOffset.x;
        const newIndex = Math.round(offsetX / screenWidth);
        setCurrentSlide(newIndex);
      }}
    />
  );
};

export default Crousl;

const styles = StyleSheet.create({
  slide: {
    width: screenWidth,
    height: screenHeight,
    backgroundColor: '#001122', // fallback
  },
  imageContainer: {
    height: screenHeight * 0.45,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  overlayContainer: {
    height: screenHeight * 0.5,
    backgroundColor: '#001122',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  appLogo: {
    width: 200,
    height: 34.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  heading: {
    color: '#3FA9F5',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
    marginBottom: 10,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  note: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 25,
  },
  dotWrapper: {
    flexDirection: 'row',
    marginBottom: 25,
  },
dotWrapper: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginBottom: 25,
},
dot: {
  width: 4,
  height: 4,
  borderRadius: 3,
  backgroundColor: '#888',
  marginHorizontal: 4,
},
activeDot: {
  width: 11,
  height: 4,
  borderRadius: 2,
  backgroundColor: '#fff',
},
  ctaButton: {
    backgroundColor: '#1679F8',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 6,
    marginBottom: 15,
  },
  ctaText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  skipBtn: {
    color: '#1679F8',
    fontSize: 15,
    fontWeight: '600',
  },
});
