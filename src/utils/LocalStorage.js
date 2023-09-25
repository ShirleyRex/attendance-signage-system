// Back4AppUtility.js

// import {MMKV} from 'react-native-mmkv';
// export const storage = new MMKV();

export const saveToLocal = (key, Value) => {
  // storage.set(key, JSON.stringify(Value));
};
export const fetchFromLocal = key => {
  // const jsonData = storage.getString(key);
  // const dataObject = JSON.parse(jsonData);
  let dataObject = {
    createdAt: '2023-09-23T17:52:36.525Z',
    objectId: 'S57uxUB3Q8',
    password: '5668888',
    studentId: 'T487uyo99899',
    updatedAt: '2023-09-23T17:52:36.525Z',
  };
  return dataObject;
};
