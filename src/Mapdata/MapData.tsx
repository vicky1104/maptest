import React, {useRef, useMemo, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useLocation} from '../context/LocationContext';
// @ts-ignore
import Stars from 'react-native-stars';
import {getImage} from '../utils';
import {BottomSheetFlashListProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/BottomSheetFlashList';

const MapData = () => {
  const {listData} = useLocation();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const flatSheetRef = useRef<any>();

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

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

  useEffect(() => {
    if (listData?.length > 0) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      flatSheetRef.current.scrollToOffset({animated: true, offset: 0});
      bottomSheetRef?.current?.close();
    }
  }, [listData]);
  // console.warn(listData, 'listData');
  return (
    <BottomSheet
      index={-1}
      style={{flex: 1}}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}>
      <BottomSheetFlatList
        ref={flatSheetRef}
        data={listData}
        keyExtractor={(item, index) => String(index)}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </BottomSheet>
  );
};

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

export default MapData;
