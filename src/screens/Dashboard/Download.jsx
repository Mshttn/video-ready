import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import { EllipsisVerticalIcon } from 'react-native-heroicons/outline';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const downloadedVideos = [
  {
    id: '1',
    title: 'Departure',
    genres: 'Action, Adventure, Fantasy',
    thumbnail: require('../../../assets/series/squiddd.png'),
  },
  {
    id: '2',
    title: 'Dracula Untold',
    genres: 'Action, Fantasy',
    thumbnail: require('../../../assets/series/squiddd.png'),
  },
  {
    id: '3',
    title: 'Brave New World',
    genres: 'Action, Fantasy',
    thumbnail: require('../../../assets/series/panchayat.png'),
  },
  {
    id: '4',
    title: 'Mega Zoo',
    genres: 'Action, Adventure, Fantasy',
    thumbnail: require('../../../assets/series/money.png'),
  },
];

const Download = ({ navigation }) => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showSheet, setShowSheet] = useState(false);

  const openOptions = (video) => {
    setSelectedVideo(video);
    setShowSheet(true);
  };

  const handleDelete = () => {
    console.log('Deleting', selectedVideo.title);
    setShowSheet(false);
  };

  const handleRedownload = () => {
    console.log('Redownloading', selectedVideo.title);
    setShowSheet(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.thumbnail} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.genres}>{item.genres}</Text>
      </View>
      <TouchableOpacity onPress={() => openOptions(item)}>
        <EllipsisVerticalIcon color="#fff" size={22} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ArrowLeftIcon color="#fff" size={24} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.header}>Downloaded</Text>
        </View>
      </View>
      
      <FlatList
        data={downloadedVideos}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
      />

      <Modal
        visible={showSheet}
        animationType="slide"
        transparent
        onRequestClose={() => setShowSheet(false)}
      >
        <Pressable style={styles.modalBackground} onPress={() => setShowSheet(false)}>
          <View style={styles.bottomSheet}>
            <View style={styles.handleBar} />

            <TouchableOpacity style={styles.sheetButton} onPress={handleDelete}>
              <Text style={styles.sheetButtonText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.sheetButton} onPress={handleRedownload}>
              <Text style={styles.sheetButtonText}>Re-download</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSheet(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    zIndex: 1,
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
    borderBottomColor: '#222',
    borderBottomWidth: 1,
    paddingBottom: 14,
  },
  thumbnail: {
    width: 100,
    height: 60,
    borderRadius: 8,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  genres: {
    color: '#aaa',
    fontSize: 13,
    marginTop: 4,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000099',
  },
  bottomSheet: {
    backgroundColor: '#0B1C34',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 8,
    backgroundColor: '#666',
    alignSelf: 'center',
    marginBottom: 16,
  },
  sheetButton: {
    paddingVertical: 14,
    borderBottomColor: '#333',
    borderBottomWidth: 1,
  },
  sheetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 60,
    backgroundColor: '#2e6ef7',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Download;