import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "@/hooks/context";
import { localMusicType } from "@/app/utils/types";
import ProgressBar from "@/components/global/ProgresBar";

const Player = () => {
  const {
    getMusicById,
    playSound,
    nextSong,
    prevSong,
    pauseSound,
    isPause,
    prev,
    next,
    setisPause,
    setnext,
    setprev,
  } = useUserContext();
  const [music, setmusic] = useState<localMusicType | undefined>(undefined);
  const route = useRouter();
  const song = useLocalSearchParams();

  useEffect(() => {
    const id = song.id as string;
    const music = getMusicById(id);
    console.log(music, "music", id);
    if (id) {
      console.log(music, "music2", id);
      if (!music || music.length <= 0) {
        return route.push("/audio");
      } else {
        setmusic(music[0]);
        if (music[0].uri) {
          playSound(music[0].uri, music[0].id);
        }
      }
    }
  }, []);

  return (
    <View style={styles.songInfoContainer}>
      <View style={styles.likeContainer}>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "700",
            width: 230,
          }}
        >
          {music?.filename?.substring(0, 50)}
          {music?.filename && music?.filename?.length > 50 ? " . . ." : null}
        </Text>
        <AntDesign name="heart" size={24} color="#fff" />
      </View>
      <Text style={{ color: "gray", marginBottom: 30 }}>3000 days </Text>

      <View style={styles.progressContainer}>
        <ProgressBar
          duration={music?.duration}
          isPause={isPause}
          next={next}
          prev={prev}
        />
      </View>

      <View style={styles.btnGroup}>
        <MaterialIcons name="replay" size={24} color="#fff" />
        <TouchableOpacity
          onPress={() => {
            const id = music?.id as string;
            const prevMusic = prevSong(id);
            playSound(prevMusic.uri, prevMusic.id);
            setmusic(prevMusic);
            setprev(true);
            setnext(true);
            setisPause(false);
          }}
        >
          <MaterialIcons name="arrow-left" size={48} color="#fff" />
        </TouchableOpacity>
        {isPause ? (
          <TouchableOpacity
            onPress={async () => {
              console.log("play clicked");
              await pauseSound("play");
              setisPause(false);
              setnext(false);
              setprev(false);
            }}
          >
            <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              console.log("pause clicked");
              await pauseSound("pause");
              setisPause(true);
              setnext(false);
              setprev(false);
            }}
          >
            <MaterialIcons name="pause-circle-filled" size={48} color="#fff" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            const id = music?.id as string;
            const nextMusic = nextSong(id);
            playSound(nextMusic.uri, nextMusic.id);
            setmusic(nextMusic);
            setnext(true);
            setprev(true);
            setisPause(false);
          }}
        >
          <MaterialIcons name="arrow-right" size={48} color="#fff" />
        </TouchableOpacity>

        <MaterialIcons name="refresh" size={24} color="#fff" />
      </View>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  play: {
    backgroundColor: "#030303",
    height: "100%",
  },
  bgimage: {
    flex: 1,
    // height: "70%"
    justifyContent: "flex-end",
    // alignItems: "baseline",
  },
  bgImgtopper: {
    flex: 1,
    backgroundColor: "#030303",
    opacity: 0.8,
    // shadowOpacity: 0.3,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  likeContainer: {
    marginTop: 50,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songInfoContainer: {
    marginHorizontal: 15,
    marginBottom: 50,
  },
  progressContainer: {},
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    alignItems: "center",
  },
});
