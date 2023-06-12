import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeStringData = (key: string, value: string) => {
  return AsyncStorage.setItem(key, value);
}

export const getStringData = (key: string) => {
  return AsyncStorage.getItem(key);
}

export const storeData = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log(e);
  }
}

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
}
