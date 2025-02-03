import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import {useLocation} from '../context/LocationContext';
import {MAP_API_KEY} from '../Constant/Constant';

const Chip = () => {
  const {location, setListData, listData, keyword, setKeyWord, clearList} =
    useLocation();
  const [text, setText] = useState('');
  const data = useMemo(
    () => [
      {name: 'Restaurants', icon: 'restaurant', type: 'MaterialIcons'},
      {name: 'Hotels', icon: 'hotel', type: 'MaterialIcons'},
      {
        name: 'Shopping',
        icon: 'shopping-outline',
        type: 'MaterialCommunityIcons',
      },
      {name: 'Petrol', icon: 'fuel', type: 'MaterialCommunityIcons'},
      {name: 'Coffee', icon: 'coffee', type: 'Feather'},
      {
        name: 'Hospitals & clinics',
        icon: 'hospital-box-outline',
        type: 'MaterialCommunityIcons',
      },
      {
        name: 'Electronic',
        icon: 'electric-bolt',
        type: 'MaterialIcons',
      },
    ],
    [],
  );

  const getIconComponent = useCallback((type: string) => {
    switch (type) {
      case 'MaterialIcons':
        return MaterialIcons;
      case 'MaterialCommunityIcons':
        return MaterialCommunityIcons;
      case 'Feather':
        return Feather;
      default:
        return MaterialIcons;
    }
  }, []);

  const getData = async (searchKeyword: string) => {
    setText(searchKeyword);
    if (!location || !searchKeyword) return;

    setKeyWord(searchKeyword);
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${MAP_API_KEY}&sensor=false&location=${location.latitude},${location.longitude}&radius=5000&keyword=${searchKeyword}`,
    );
    const data = await res.json();
    setListData(data?.results);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (text) {
        getData(text);
      }
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [text]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Search"
          style={styles.searchInput}
        />
        {keyword?.length > 0 && (
          <Pressable
            onPress={() => {
              clearList();
              setText('');
            }}
            style={styles.clearButton}>
            <Entypo name="circle-with-cross" size={30} color="black" />
          </Pressable>
        )}
      </View>
      {listData?.length === 0 && (
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, i}: any) => {
            const IconComponent = getIconComponent(item.type);
            return (
              <TouchableOpacity onPress={() => getData(item?.name)}>
                <View key={i} style={styles.chipContainer}>
                  <IconComponent name={item.icon} size={24} color="#000" />
                  <Text style={styles.chipText}>{item?.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    width: '100%',
  },
  searchContainer: {
    backgroundColor: 'white',
    width: '90%',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 99,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginBottom: 16,
  },
  searchInput: {
    width: '85%',
  },
  clearButton: {
    position: 'absolute',
    zIndex: 9999,
    right: 20,
    top: 5,
  },
  chipContainer: {
    backgroundColor: 'white',
    paddingVertical: 4,
    marginHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 24,
    overflow: 'hidden',
  },
  chipText: {
    marginLeft: 4,
  },
});

export default Chip;
