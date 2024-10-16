import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Href, useNavigation, usePathname, useRouter } from "expo-router";
import { localMusicType } from "@/app/utils/types";
import { useUserContext } from "@/hooks/context";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressBar } from "../global";

type Props = {
  item: localMusicType;
  setisPlaylist?: React.Dispatch<React.SetStateAction<number>>;
};
const PhoneSong = ({ item, setisPlaylist }: Props) => {
  const router = useRouter();
  const navigation = usePathname();

  const {
    playSound,
    musicFiles,
    pauseSound,
    setisPause,
    playingMusic,
    setnext,
    setprev,
    isPause,
    next,
    prev,
    nextSong,
  } = useUserContext();
  const [firstimePlay, setfirstimePlay] = useState(true);
  const [isPlay, setisPlay] = useState(true);
  const playNextSong = () => {
    const id = item?.id as string;
    const nextMusic = nextSong(id);
    playSound(nextMusic.uri, nextMusic.id);

    setnext(true);
    setprev(true);
    setisPause(false);
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        onPress={() => {
          const path = `/music/play/${item.id}` as Href<string>;
          setisPause(false);
          router.push(path);
        }}
        style={styles.songContainer}
      >
        <View style={styles.songInfoCon}>
          <Image
            style={{ borderRadius: 15 }}
            source={{
              uri: "https://cdn.iconscout.com/icon/free/png-512/free-music-icon-download-in-svg-png-gif-file-formats--player-mp-song-audio-dj-user-interface-vol-2-pack-icons-14874.png?f=webp&w=256",
            }}
            height={55}
            width={55}
          />
          <View>
            <Text
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 900,
                width: 200,
              }}
            >
              {item.filename.substring(0, 50)}{" "}
              {item.filename.length > 50 ? " . . ." : null}
            </Text>
            <View style={styles.musicDetails}>
              <Text style={{ color: "#fff", fontSize: 10 }}>
                {item.mediaType}
              </Text>
              <Text style={{ color: "#fff", fontSize: 10 }}>
                {(item.duration / 60).toFixed(2)} min
              </Text>
            </View>
          </View>
        </View>

        {isPlay && playingMusic.length > 0 && playingMusic[0].id === item.id ? (
          <TouchableOpacity
            onPress={async () => {
              const itemid = musicFiles.filter(
                (song) => song.id === item.id
              )[0];
              if (itemid) {
                setfirstimePlay(true);
                setisPlay(false);
                setisPause(true);
                pauseSound("pause");
              }
              if (setisPlaylist) {
                if (navigation == "/audio") {
                  setisPlaylist((prev) => (prev >= 5 ? 1 : prev + 1));
                }
              }
            }}
          >
            <MaterialIcons name="pause-circle-filled" size={48} color="#fff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              const itemid = musicFiles.filter(
                (song) => song.id === item.id
              )[0];

              if (itemid) {
                if (playingMusic[0]?.id !== item.id) {
                  playSound(item.uri, item.id);
                  setfirstimePlay(false);
                  setisPlay(true);
                  setisPause(false);
                  setnext(true);
                  setprev(true);
                } else {
                  pauseSound("play");
                  setnext(false);
                  setprev(false);
                  setisPlay(true);
                  setisPause(false);
                }
              }

              if (setisPlaylist) {
                if (navigation == "/audio") {
                  setisPlaylist((prev) => prev + 1);
                }
              }
            }}
          >
            <MaterialIcons name="play-circle-fill" size={48} color="#fff" />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      {playingMusic[0]?.id === item.id && (
        <View style={{ alignSelf: "center" }}>
          <ProgressBar
            duration={item?.duration}
            isPause={isPause}
            next={next}
            prev={prev}
            playNextSong={playNextSong}
          />
        </View>
      )}
    </View>
  );
};

export default PhoneSong;

const styles = StyleSheet.create({
  mainContainer: {},
  songContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  songInfoCon: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    width: "60%",
  },
  musicDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
