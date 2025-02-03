import {View, Text, useWindowDimensions} from 'react-native';
import React from 'react';
import {SceneMap, TabView} from 'react-native-tab-view';
import Map from '../component/Map';
import List from '../component/List';

const renderScene = SceneMap({
  first: Map,
  second: List,
});

const routes = [
  {key: 'first', title: 'Tab1'},
  {key: 'second', title: 'Tab2'},
];

function Tab() {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

export default Tab;
