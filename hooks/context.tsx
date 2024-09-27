import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { localMusicType } from "@/app/utils/types";
import { Audio } from "expo-av";

// Define the context type
type ContextType = {
  getMusicById: (id: string) => localMusicType[] | [];
  musicFiles: localMusicType[]; // This is always an array
  requestPermission: () => Promise<void>; // Async function to request permissions
  playSound: (url: string) => Promise<void>;
};

// Provide a default empty context value
const defaultContextValue: ContextType = {
  musicFiles: [],
  requestPermission: async () => {},
  getMusicById: () => [],
  playSound: async () => {},
};

// Create a Context with the defined type
const UserContext = createContext<ContextType>(defaultContextValue);

// Create a Provider component to wrap your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [musicFiles, setMusicFiles] = useState<localMusicType[]>([]);
  const [sound, setSound] = useState<Audio.Sound>();

  const loadMusicFiles = async () => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: "audio", // Fetch only audio files
    });
    const mediaData = media.assets as localMusicType[];

    setMusicFiles(mediaData);
  };

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      loadMusicFiles();
    } else {
      alert("Permission to access media library is required!");
    }
  };

  const getMusicById = (id: string) => {
    const filter = musicFiles.filter((item) => item.id === id);
    return filter;
  };
  // play audio
  async function playSound(url: string) {
    console.log("Loading Sound", url);
    const { sound } = await Audio.Sound.createAsync(require(url));
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <UserContext.Provider
      value={{ musicFiles, requestPermission, getMusicById, playSound }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => useContext(UserContext);

// "file:///storage/emulated/0/y2mate.com - One Drop Reggae Mix 2022  Riddims Reggae SongsBusy SignalJah Cure AlaineVybz KartelDj Danpaul.mp3"
