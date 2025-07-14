import React, { useState ,useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { CheckIcon, Square2StackIcon, ArrowLeftIcon } from 'react-native-heroicons/solid';
import { geners } from '../../constants/geners';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useDispatch , useSelector} from 'react-redux';
import { setFavoriteGenres } from '../../redux/Slices/userSlices';


const { width } = Dimensions.get('window');
const ITEM_WIDTH = width / 3.4;
const ITEM_HEIGHT = 140;
const ITEM_MARGIN = 10;

const Geners = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState([]);
  const dispatch=useDispatch();
  const {  favoriteGenres}= useSelector((state)=>state.user);

  useEffect(() => {
  if (  favoriteGenres?.length) {
    setSelected(  favoriteGenres);
  }
}, []);

  const toggleSelect = (genre) => {
  let updatedSelected = [];

  const isAlreadySelected = selected.some((item) => item.title === genre.title);

  if (isAlreadySelected) {
    updatedSelected = selected.filter((item) => item.title !== genre.title);
  } else {
    updatedSelected = [...selected, { title: genre.title, image: genre.image }];
  }

  setSelected(updatedSelected);
  dispatch(setFavoriteGenres(updatedSelected));
};


const renderItem = ({ item }) => {
  const isSelected = selected.some((g) => g.title === item.title);

  return (
    <TouchableOpacity onPress={() => toggleSelect(item)}>
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.card}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.genreText}>{item.title}</Text>
          {isSelected ? (
            <CheckIcon size={20} color="#1E90FF" />
          ) : (
            <Square2StackIcon size={20} color="#ccc" />
          )}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

  const goToHomeTabs = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'MovieStack' }],
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Genre</Text>
        <View style={{ width: 24 }} /> {/* placeholder for spacing */}
      </View>

      <Text style={styles.subTitle}>Choose at least 3 favorite genres</Text>

      <FlatList
        data={geners}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={3}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.confirmBtn,
            { opacity: selected.length >= 3 ? 1 : 0.5 },
          ]}
          disabled={selected.length < 3}
          onPress={goToHomeTabs}
        >
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={goToHomeTabs}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Geners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    paddingTop: 50,
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  subTitle: {
    color: '#aaa',
    fontSize: 14,
    fontWeight: 'bold', // 👈 make subtitle bold
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 20,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    margin: ITEM_MARGIN / 2,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  overlay: {
    backgroundColor: 'black',
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  genreText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  confirmBtn: {
    width: '100%',
    backgroundColor: '#1679F8',
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipText: {
    color: '#1679F8',
    fontSize: 16,
  },
});
