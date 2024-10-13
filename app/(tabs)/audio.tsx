import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import PhoneSong from "@/components/audio/PhoneSong";
import { MaterialIcons } from "@expo/vector-icons";
import { localMusicType } from "../utils/types";
import { useUserContext } from "@/hooks/context";

const Audio = () => {
  const { requestPermission } = useUserContext();
  const [musicFiles, setmusicFiles] = useState<localMusicType[] | []>([]);
  const [isPlaylist, setisPlaylist] = useState(0);
  useEffect(() => {
    requestPermission("audio").then((item) => setmusicFiles(item));
    requestPermission("video");
  }, [isPlaylist]);

  return (
    <View style={styles.libraryContainer}>
      <View style={styles.addContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,

            color: "#fff",
          }}
        >
          Your music
        </Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={{ color: "#fff", textAlign: "center" }}>Add folder</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.songListCon}>
        <FlatList
          data={musicFiles}
          renderItem={({ item, index }) => (
            <PhoneSong key={index} item={item} setisPlaylist={setisPlaylist} />
          )}
        />
      </View>
      {/* {isMusicPlaying && (
        <View style={styles.playerContainer}>
          <SongPlayer />
        </View>
      )} */}
    </View>
  );
};

export default Audio;

const styles = StyleSheet.create({
  libraryContainer: {
    backgroundColor: "#030303",
    height: "100%",
  },
  songListCon: {
    marginTop: 30,
    height: 600,
  },
  addContainer: {
    marginTop: 50,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#1c1c1e",
    padding: 3,
    borderRadius: 30,
    width: 120,
    flexDirection: "row",
    gap: 10,
  },
  playerContainer: {
    backgroundColor: "#221010",
    position: "absolute",

    bottom: 0,
    width: "auto",
    borderRadius: 20,
    // marginHorizontal: 20,
    left: 0,
    right: 0,
  },
});
