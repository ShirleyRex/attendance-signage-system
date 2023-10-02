import {MMKV} from 'react-native-mmkv';
export const storage = new MMKV();

export const saveToLocal = (key, Value) => {
  storage.set(key, JSON.stringify(Value));
};
export const fetchFromLocal = key => {
  // const jsonData = storage.getString(key);
  // const dataObject = JSON.parse(jsonData);
  // return dataObject;
  if (storage.contains(key)) {
    const jsonData = storage.getString(key);
    const dataObject = JSON.parse(jsonData);
    return dataObject;
  } else {
    // Key doesn't exist, return null or handle it as needed
    return null;
  }
};
