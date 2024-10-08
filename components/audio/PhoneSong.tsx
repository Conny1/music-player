import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Href, useRouter } from "expo-router";
import { localMusicType } from "@/app/utils/types";
import { useUserContext } from "@/hooks/context";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  item: localMusicType;
};
const PhoneSong = ({ item }: Props) => {
  const navigation = useRouter();
  const { playSound, musicFiles, pauseSound, setisPause, playingMusic } =
    useUserContext();
  const [firstimePlay, setfirstimePlay] = useState(true);
  const [isPlay, setisPlay] = useState(true);

  return (
    <TouchableOpacity
      onPress={() => {
        const path = `/music/play/${item.id}` as Href<string>;
        setisPause(false);
        navigation.push(path);
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
            style={{ color: "#fff", fontSize: 15, fontWeight: 900, width: 200 }}
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
            const itemid = musicFiles.filter((song) => song.id === item.id)[0];
            if (itemid) {
              setfirstimePlay(true);
              setisPlay(false);
              pauseSound("pause");
            }
          }}
        >
          <MaterialIcons name="pause-circle-filled" size={48} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={async () => {
            const itemid = musicFiles.filter((song) => song.id === item.id)[0];
            if (itemid) {
              if (firstimePlay) {
                playSound(item.uri, item.id);
                setfirstimePlay(false);
                setisPlay(true);
              }
              if (playingMusic[0]?.id !== item.id) {
                setfirstimePlay(true);
              }
            }
          }}
        >
          <MaterialIcons name="play-circle-fill" size={48} color="#fff" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default PhoneSong;

const styles = StyleSheet.create({
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
