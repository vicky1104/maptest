import React, {createContext, useState, useContext, ReactNode} from 'react';

interface Location {
  latitude: number;
  longitude: number;
  listData: any[];
  setListData: any;
  clearList: any;
  keyword: string;
  setKeyWord: any;
}

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location | null) => void;
  listData: any;
  setListData: any;
  clearList: any;
  keyword: string;
  setKeyWord: any;
}

const LocationContext = createContext<LocationContextType | undefined>(
  undefined,
);

interface LocationProviderProps {
  children: ReactNode;
}

export const LocationProvider: React.FC<LocationProviderProps> = ({
  children,
}) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [listData, setListData] = useState([]);
  const [keyword, setKeyWord] = useState('');

  function clearList() {
    setKeyWord('');
    setListData([]);
  }

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        listData,
        setListData,
        clearList,
        setKeyWord,
        keyword,
      }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
