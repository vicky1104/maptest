import {MAP_API_KEY} from '../Constant/Constant';

export const getImage = (refImg: string) => {
  return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${refImg}&key=${MAP_API_KEY}`;
};
