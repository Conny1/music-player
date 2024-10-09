import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localMusicType } from "@/app/utils/types";

const useLocalstorage = () => {
  const [data, setData] = useState<Object>({});

  const storeData = async (payload: localMusicType[], playlistName: string) => {
    try {
      let body: { [key: string]: localMusicType[] } = {};

      const data = await getData("playlistZeroOne(01)");

      if (data) {
        if (data[playlistName]) {
          return {
            success: false,
            message: "Playlist with similar name exists",
          };
        } else {
          body = { ...data };
          body[playlistName] = payload;
          setData(body);
        }
      }
      const jsonValue = JSON.stringify(body);

      await AsyncStorage.setItem("playlistZeroOne(01)", jsonValue);
      return {
        success: true,
        message: "Playlist created",
      };
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);

      if (jsonValue) {
        setData(JSON.parse(jsonValue));
      }
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  return { data, getData, storeData };
};

export default useLocalstorage;
