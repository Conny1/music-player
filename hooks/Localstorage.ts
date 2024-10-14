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

  const updatePlaylistData = async (
    key: string,
    playlistName: string,
    payload: localMusicType[]
  ) => {
    try {
      const data = (await getData("playlistZeroOne(01)")) as {
        [key: string]: localMusicType[];
      };

      if (data) {
        if (data[key]) {
          delete data[key];

          data[playlistName] = payload;
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem("playlistZeroOne(01)", jsonValue);
          return {
            success: true,
            message: "Media Updated",
          };
        } else {
          return {
            success: false,
            message: " Media does not exist",
          };
        }
      }

      return {
        success: false,
        message: "try again later",
      };
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const deleteData = async (
    payload: localMusicType | null,
    playlistName: string,
    type: string
  ) => {
    try {
      const data = (await getData("playlistZeroOne(01)")) as {
        [key: string]: localMusicType[];
      };
      if (type === "media" && payload) {
        if (data) {
          if (data[playlistName]) {
            const newData = data[playlistName].filter(
              (item) => item.id !== payload.id
            );
            if (newData.length === 0)
              return {
                success: true,
                message: "Playlist cannot be empty",
              };
            data[playlistName] = newData;
            const jsonValue = JSON.stringify(data);
            await AsyncStorage.setItem("playlistZeroOne(01)", jsonValue);
            return {
              success: true,
              message: "Media deleted",
            };
          } else {
            return {
              success: false,
              message: " Media does not exist",
            };
          }
        }
      } else {
        delete data[playlistName];
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem("playlistZeroOne(01)", jsonValue);
        return {
          success: true,
          message: " Playlist deleted",
        };
      }

      return {
        success: false,
        message: "try again later",
      };
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return { data, getData, storeData, deleteData, updatePlaylistData };
};

export default useLocalstorage;
