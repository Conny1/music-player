import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { localMusicType } from "../utils/types";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import useLocalstorage from "@/hooks/Localstorage";
import PlaylistCard from "@/components/playlist/PlaylistCard";
import BottomeSheet from "@/components/playlist/BottomeSheet";
import UpdatePlaylist from "@/components/playlist/updatePlaylist";

const Playlist = () => {
  const [open, setopen] = useState(-1);
  const [updateModalOpen, setupdateModalOpen] = useState(-1);
  const [existingDta, setexistingDta] = useState<localMusicType[]>([]);
  const [updateKey, setupdateKey] = useState("");
  const [playlistNameKey, setplaylistNameKey] = useState("");
  const { getData } = useLocalstorage();
  const [playListkey, setplayListkey] = useState<String[] | []>([]);
  const [playlistData, setplaylistData] = useState<
    | {
        [key: string]: localMusicType[];
      }
    | undefined
  >();

  // callbacks

  useEffect(() => {
    getData("playlistZeroOne(01)").then(
      (resp: { [key: string]: localMusicType[] }) => {
        setplayListkey(Object.keys(resp));
        setplaylistData(resp);
      }
    );
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.playlistContainer}>
        <View style={styles.addContainer}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 600,

              color: "#fff",
            }}
          >
            Playlist
          </Text>
          <TouchableOpacity onPress={() => setopen(0)} style={styles.addBtn}>
            <MaterialIcons name="add" size={24} color="#fff" />
            <Text style={{ color: "#fff", textAlign: "center" }}>Create</Text>
          </TouchableOpacity>
        </View>
        {playListkey.length >= 1 ? (
          <FlatList
            data={playListkey}
            renderItem={({ item, index }) => {
              return (
                <PlaylistCard
                  key={index}
                  item={item}
                  playlistData={playlistData}
                  setplaylistData={setplaylistData}
                  setplayListkey={setplayListkey}
                  setupdateModalOpen={setupdateModalOpen}
                  setexistingDta={setexistingDta}
                  setplaylistNameKey={setplaylistNameKey}
                  setupdateKey={setupdateKey}
                />
              );
            }}
          />
        ) : (
          <TouchableOpacity style={styles.addIcon}>
            <MaterialIcons name="playlist-add" size={100} color="#fff" />
          </TouchableOpacity>
        )}
        {/* bottom shit */}
        <BottomeSheet
          setOpen={setopen}
          open={open}
          setplaylistData={setplaylistData}
          setplayListkey={setplayListkey}
        />

        {/* bottom shit */}
        <UpdatePlaylist
          setOpen={setupdateModalOpen}
          open={updateModalOpen}
          setplaylistData={setplaylistData}
          setplayListkey={setplayListkey}
          existingDta={existingDta}
          playlistNameKey={playlistNameKey}
          updateKey={updateKey}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  playlistContainer: {
    backgroundColor: "#030303",
    height: "100%",
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
  addIcon: {
    // alignSelf: "center",
    margin: "auto",
  },
});
