import AsyncStorage from "@react-native-async-storage/async-storage"

export const storeData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(
      key,
      typeof value === "object" ? JSON.stringify(value) : value
    )
  } catch (e) {
    throw new Error("an error occurred while saving data")
  }
}

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value
  } catch (e) {
    throw new Error("an error occurred while getting data")
  }
}

export const deleteDate = (key: string) => {
  try {
    AsyncStorage.removeItem(key)
  } catch (e) {
    throw new Error("an error occurred while getting data")
  }
}
