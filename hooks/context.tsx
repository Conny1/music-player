import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import * as MediaLibrary from "expo-media-library";
import { genraType, localMusicType, localVideoType } from "@/app/utils/types";
import { Audio, InterruptionModeAndroid } from "expo-av";

// Define the context type
type ContextType = {
  getMusicById: (id: string) => localMusicType[] | [];
  getVideoById: (id: string) => localVideoType[] | [];

  musicFiles: localMusicType[]; // This is always an array
  requestPermission: (
    type: "audio" | "video"
  ) => Promise<localMusicType[] | []>; // Async function to request permissions
  playSound: (url: string, id: string) => Promise<void>;
  nextSong: (id: string) => localMusicType;
  prevSong: (id: string) => localMusicType;
  isMusicPlaying: boolean;
  getMusicGenre: () => Promise<genraType[] | []>;
  pauseSound: (type: "play" | "pause") => void;
  isPause: boolean;
  setisPause: React.Dispatch<React.SetStateAction<boolean>>;
  next: boolean;
  setnext: React.Dispatch<React.SetStateAction<boolean>>;
  prev: boolean;
  setprev: React.Dispatch<React.SetStateAction<boolean>>;
  playingMusic: localMusicType[];
  videoFiles: localVideoType[];
  playnextSongAutonaticly: (currentSongid: string) => void;
};

// Provide a default empty context value
let defaultMusic = {
  id: "",
  filename: "",
  mediaType: "",
  uri: "",
  duration: 0,
};
const defaultContextValue: ContextType = {
  musicFiles: [],
  requestPermission: async () => [],
  getMusicById: () => [],
  getVideoById: () => [],
  playSound: async () => {},
  nextSong: (id) => defaultMusic,
  prevSong: (id) => defaultMusic,
  isMusicPlaying: false,
  getMusicGenre: async () => [],
  pauseSound: async () => {},
  isPause: false,
  setisPause: () => false,
  next: false,
  setnext: () => false,
  prev: false,
  setprev: () => false,
  playingMusic: [],
  videoFiles: [],
  playnextSongAutonaticly: (currentSongid) => {},
};

// Create a Context with the defined type
const UserContext = createContext<ContextType>(defaultContextValue);

// Create a Provider component to wrap your app
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [musicFiles, setMusicFiles] = useState<localMusicType[] | []>([]);
  const [videoFiles, setvideoFiles] = useState<localVideoType[] | []>([]);
  const [sound, setSound] = useState<Audio.Sound>();
  const [isMusicPlaying, setisMusicPlaying] = useState(false);
  const [isPause, setisPause] = useState(false);
  const [next, setnext] = useState(false);
  const [prev, setprev] = useState(false);
  const [playingMusic, setplayingMusic] = useState<localMusicType[] | []>([]);
  const loadMusicFiles = async (type: "audio" | "video") => {
    const media = await MediaLibrary.getAssetsAsync({
      mediaType: type, // Fetch only audio files
    });
    const mediaData = media.assets as localMusicType[];
    if (type === "audio") {
      setMusicFiles(mediaData);
    } else if (type === "video") {
      setvideoFiles(mediaData);
    }

    return mediaData;
  };

  const requestPermission = async (type: "audio" | "video") => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      return loadMusicFiles(type);
    } else {
      alert("Permission to access media library is required!");
      return [];
    }
  };

  const getMusicById = (id: string) => {
    const filter = musicFiles.filter((item) => item.id === id);
    return filter;
  };

  const getVideoById = (id: string) => {
    const filter = videoFiles.filter((item) => item.id === id);
    return filter;
  };

  // play audio
  async function playSound(url: string, id: string) {
    console.log("Loading Sound", url);
    if (sound) {
      await sound.unloadAsync();
    }

    const { sound: soundAudio } = await Audio.Sound.createAsync({ uri: url });
    await Audio.setAudioModeAsync({
      // allowsRecordingIOS: false,
      staysActiveInBackground: true,
      // interruptionModeIOS: InterruptionModeIOS.DuckOthers,
      // playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      interruptionModeAndroid: InterruptionModeAndroid.DuckOthers,
      playThroughEarpieceAndroid: false,
    });
    setSound(soundAudio);

    console.log("Playing Sound");
    setisMusicPlaying(true);
    await soundAudio.playAsync();
    setplayingMusic(getMusicById(id));
  }
  // pause sound
  // Pause sound
  async function pauseSound(type: "play" | "pause") {
    if (sound && type == "pause") {
      await sound.pauseAsync();
    } else if (sound && type == "play") {
      await sound.playAsync();
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const nextSong = (id: string) => {
    let song = musicFiles[musicFiles.length - 1];
    for (let i = 1; i <= musicFiles.length; i++) {
      if (id === musicFiles[i - 1].id && i <= musicFiles.length - 1) {
        return (song = musicFiles[i]);
      }
    }

    return song;
  };

  const playnextSongAutonaticly = (currentSongid: string) => {
    const nextSongData = musicFiles.filter((item, i) =>
      item.id === currentSongid && i <= musicFiles.length - 1 ? i + 1 : i
    );
    const nextSongId = nextSongData[0].id;
    playSound(nextSong(nextSongId).uri, nextSong(nextSongId).id);
    return nextSong(nextSongId);
  };

  const prevSong = (id: string) => {
    let song = musicFiles[0];
    for (let i = 0; i < musicFiles.length; i++) {
      if (id === musicFiles[i].id && i >= 1) {
        return (song = musicFiles[i - 1]);
      }
    }
    return song;
  };
  // Drezer Api
  const getMusicGenre = async () => {
    const uri = process.env.EXPO_PUBLIC_DREEZER_BASE_URL;

    const resp = await fetch(`${uri}/genre`);
    const dataResp = await resp.json();

    if (dataResp) {
      return dataResp?.data;
    }
    return [];
  };

  return (
    <UserContext.Provider
      value={{
        musicFiles,
        requestPermission,
        getMusicById,
        getVideoById,
        playSound,
        nextSong,
        prevSong,
        isMusicPlaying,
        getMusicGenre,
        pauseSound,
        isPause,
        prev,
        next,
        setisPause,
        setnext,
        setprev,
        playingMusic,
        videoFiles,
        playnextSongAutonaticly,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the context
export const useUserContext = () => useContext(UserContext);

// "file:///storage/emulated/0/y2mate.com - One Drop Reggae Mix 2022  Riddims Reggae SongsBusy SignalJah Cure AlaineVybz KartelDj Danpaul.mp3"
