import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  Alert,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Modal,
  Button,
  Linking,
} from 'react-native';
import * as Location from 'expo-location';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import MapView, {Callout, Marker} from 'react-native-maps';
import {useLocation} from '../context/LocationContext';
import Chip from './Chip';
import MapData from '../Mapdata/MapData';

function Map() {
  const [locationNotFound, setLocationNotFound] = useState('');
  const {location, setLocation, listData} = useLocation();
  useEffect(() => {
    checkLocationServices();
    checkLocationPermission();
  }, []);

  const checkLocationServices = async () => {
    const isEnabled = await Location.hasServicesEnabledAsync();

    if (!isEnabled) {
      Alert.alert(
        'Location Services Disabled',
        'Please enable location services in your device settings.',
        [{text: 'OK'}],
      );
    }
  };

  const checkLocationPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'android') {
      permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
      permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      getLocation();
    } else {
    }
  };

  const getLocation = async () => {
    try {
      const loc: any = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    } catch (error: any) {
      console.log(error);
      let errText;
      if (error.code === 1) {
        //no permission
        errText =
          'Permission denied. Please enable location permissions in settings.';
        Alert.alert(errText);
        setLocationNotFound(errText);
      } else if (error.code === 2) {
        errText =
          'Location services are turned off. Please enable them in settings.';
        Alert.alert(errText);
        setLocationNotFound(errText);
      } else {
        errText =
          'Location services are turned off. Please enable them in settings.';
        setLocationNotFound(errText);
        Alert.alert(errText);
      }
    }
  };

  const requestLocationPermission = async () => {
    let permissionStatus;
    if (Platform.OS === 'android') {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
    } else {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }

    if (permissionStatus === RESULTS.GRANTED) {
      getLocation();
    } else {
      Alert.alert('Permission denied');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  if (locationNotFound?.length > 0) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={{marginBottom: 20}}>{locationNotFound}</Text>
        <Button
          onPress={() => Linking.openSettings()}
          title="Turn On loction"
        />
      </View>
    );
  }

  return (
    <>
      {location ? (
        <>
          <Chip />
          <MapView
            showsCompass={false}
            showsTraffic={false}
            followsUserLocation
            // ref={mapRef}

            showsUserLocation
            mapPadding={{
              top: 150,
              right: 20,
              left: 20,
              bottom: 150,
            }}
            style={StyleSheet.absoluteFill}
            provider="google"
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}>
            {listData?.map((ele: any, i: number) => {
              return (
                <Marker
                  image={{uri: ele?.icon}}
                  title={ele.name}
                  key={i}
                  useLegacyPinView
                  coordinate={{
                    longitude: ele?.geometry?.location.lng,
                    latitude: ele?.geometry?.location.lat,
                  }}
                />
              );
            })}
          </MapView>
          <MapData />
        </>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 20}}>
            Please wait while fetching location
          </Text>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
}

export default Map;
