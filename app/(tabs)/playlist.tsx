import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PhoneSong from "@/components/audio/PhoneSong";
import { MaterialIcons } from "@expo/vector-icons";
import { localMusicType } from "../utils/types";
import { useUserContext } from "@/hooks/context";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useLocalstorage from "@/hooks/Localstorage";
import PlaylistCard from "@/components/playlist/PlaylistCard";
import BottomeSheet from "@/components/playlist/BottomeSheet";

const Playlist = () => {
  const [open, setopen] = useState(0);

  const { getData, storeData } = useLocalstorage();
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
                />
              );
            }}
          />
        ) : (
          <TouchableOpacity>
            <MaterialIcons name="playlist-add" size={50} color="black" />
          </TouchableOpacity>
        )}
        {/* bottom shit */}
        <BottomeSheet open={open} />
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
});
