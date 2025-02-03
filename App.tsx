import React from 'react';
import {View} from 'react-native';
import {LocationProvider} from './src/context/LocationContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Tab from './src/tab';

const App = () => {
  return (
    <LocationProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}> */}
        <Tab />
        {/* </View> */}
      </GestureHandlerRootView>
    </LocationProvider>
  );
};

export default App;
