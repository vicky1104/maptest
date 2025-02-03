import {
  View,
  Text,
  VirtualizedList,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useRef} from 'react';
import {useLocation} from '../context/LocationContext';
//@ts-ignore
import Stars from 'react-native-stars';
import {getImage} from '../utils';

function List() {
  const {listData} = useLocation();

  const renderItem = useCallback(
    ({item, index}: any) => {
      return (
        <View key={index} style={styles.itemContainer}>
          <View style={styles.imageRow}>
            {item.photos?.map((ele: any, i: number) => (
              <Image
                key={i}
                source={{uri: getImage(ele.photo_reference)}}
                style={styles.image}
              />
            ))}
          </View>

          <Text style={styles.itemName}>{item?.name}</Text>
          <View style={styles.ratingRow}>
            <Text style={{marginRight: 8}}>{item?.rating}</Text>
            <Stars
              default={item?.rating}
              count={5}
              half={true}
              starSize={30}
              fullStar={<Text style={{color: 'gold'}}>★</Text>}
              emptyStar={<Text style={{color: 'grey'}}>☆</Text>}
              halfStar={<Text style={{color: 'gold'}}>★</Text>}
            />
          </View>
          <Text
            style={{
              color: item?.opening_hours?.open_now ? 'green' : 'grey',
            }}>
            {item?.opening_hours?.open_now ? 'Open' : 'Closed'}
          </Text>
        </View>
      );
    },
    [getImage],
  );

  return (
    <>
      <FlatList
        data={listData}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{flex: listData?.length > 0 ? undefined : 1}}
        ListEmptyComponent={() => {
          return (
            <View
              style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
              <Text>No data as of now</Text>
            </View>
          );
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  imageRow: {
    flexDirection: 'row',
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 12,
  },
  itemName: {
    marginVertical: 4,
    fontWeight: 'bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'grey',
  },
});

export default List;
