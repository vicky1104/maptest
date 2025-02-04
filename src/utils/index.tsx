import Config from 'react-native-config';
const mapKey = Config.MAP_API_KEY;
export const getImage = (refImg: string) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${refImg}&key=${mapKey}`;
};
