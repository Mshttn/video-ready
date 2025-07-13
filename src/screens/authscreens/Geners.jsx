import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { ChartBarSquareIcon } from 'react-native-heroicons/solid';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 108;
const ITEM_HEIGHT = 132;
const ITEM_MARGIN = 13;

const genres = [
  { id: '1', name: 'Action', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '2', name: 'Romance', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '3', name: 'Comedy', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '4', name: 'War', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '5', name: 'Horror', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '6', name: 'Sci-Fi', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '7', name: 'Cartoon', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '8', name: 'Drama', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '9', name: 'Documentary', image: require('../../../assets/slidesss/Intro1.png') },
    { id: '10', name: 'Cartoon', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '11', name: 'Drama', image: require('../../../assets/slidesss/Intro1.png') },
  { id: '12', name: 'Documentary', image: require('../../../assets/slidesss/Intro1.png') },
];

const Geners = () => {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const renderItem = ({ item, index }) => {
    const isSelected = selected.includes(item.id);

    // Handle custom margins for first and third column
    const isFirstColumn = index % 3 === 0;
    const isThirdColumn = index % 3 === 2;

    return (
      <TouchableOpacity
        onPress={() => toggleSelect(item.id)}
        style={[
          styles.card,
          {
            marginLeft: isFirstColumn ? 18 : ITEM_MARGIN / 2,
            marginRight: isThirdColumn ? 18 : ITEM_MARGIN / 2,
          },
        ]}
      >
        <Image source={item.image} style={styles.image} />
        <View style={styles.labelRow}>
          <Text style={styles.label}>{item.name}</Text>
          <ChartBarSquareIcon
            size={22}
            color={isSelected ? '#1E90FF' : '#999'}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Genre</Text>
      <Text style={styles.subTitle}>Choose at least 3 favorite genres</Text>

      <FlatList
        data={genres}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      {/* Show Confirm/Skip only if 3+ selected */}
      {selected.length >= 3 && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.confirmBtn}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Geners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    paddingTop: 60,
    paddingHorizontal: 15,
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
    textAlign: 'center',
    marginBottom: 20,
  },
  grid: {
    paddingBottom: 20,
  },
  card: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    backgroundColor: '#0F1A2E',
    borderRadius: 6,
    overflow: 'hidden',
    alignItems: 'center',
    marginVertical: 6,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    resizeMode: 'cover',
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
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
