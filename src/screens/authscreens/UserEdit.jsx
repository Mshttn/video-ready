import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import { setUserName, setUserImage, setAgeGroup,setUserProfiles } from '../../redux/Slices/userSlices';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from 'react-native-heroicons/outline';


const { width } = Dimensions.get('window');

const ageOptions = ['Under 7', '7+', '13+', '16+', '18+'];

const UserEdit = ({ navigation }) => {
  const dispatch = useDispatch();
  const { name, profileImage, ageGroup,profiles} = useSelector((state) => state.user);
  

  const [localName, setLocalName] = useState(name);
  const [localAgeGroup, setLocalAgeGroup] = useState(ageGroup);
  const [localImage, setLocalImage] = useState(profileImage);

  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png';

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setLocalImage(response.assets[0].uri);
      }
    });
  };

 const handleSave = () => {
  if (!localName.trim()) {
    Alert.alert('Validation', 'Please enter a name');
    return;
  }

  const newProfile = {
    name: localName.trim(),
    image: localImage || defaultImage,
  };

  dispatch(setUserName(localName));
  dispatch(setUserImage(localImage || defaultImage));
  dispatch(setAgeGroup(localAgeGroup));

  // Update profile list by adding this profile to Redux
 dispatch(setUserProfiles([ newProfile,...profiles]));

  Alert.alert('Success', 'Profile updated');
  navigation.goBack();
};


  return (
    <View style={styles.container}>
  
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
        <View style={{ width: 26 }} />
      </View>

     
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: localImage || defaultImage }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIcon} onPress={handleImagePick}>
          <PencilIcon size={18} color="#1679F8" />
        </TouchableOpacity>
      </View>

     
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={localName}
        onChangeText={setLocalName}
        placeholder="Enter your name"
        placeholderTextColor="#888"
        style={styles.input}
      />

     
      <Text style={[styles.label, { marginTop: 20 }]}>Select age group</Text>
      <View style={styles.ageContainer}>
        {ageOptions.map((option) => (
          <TouchableOpacity
            key={option}
            onPress={() => setLocalAgeGroup(option)}
            style={[
              styles.ageOption,
              localAgeGroup === option && styles.ageSelected,
            ]}
          >
            <Text
              style={{
                color: localAgeGroup === option ? '#fff' : '#888',
                fontWeight: '500',
              }}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

    
      <View style={styles.deleteRow}>
        <Text style={styles.label}>Delete Profile</Text>
        <TouchableOpacity>
          <TrashIcon size={22} color="#1679F8" />
        </TouchableOpacity>
      </View>

     
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserEdit;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#061124',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: width / 2 - 90 / 2 - 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 6,
  },
  label: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#121F35',
    borderRadius: 6,
    padding: 12,
    color: '#fff',
  },
  ageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  ageOption: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderColor: '#444',
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  ageSelected: {
    backgroundColor: '#1679F8',
    borderColor: '#1679F8',
  },
  deleteRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 30,
  },
  saveBtn: {
    backgroundColor: '#1679F8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
