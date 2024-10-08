import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
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
import Checkbox from "expo-checkbox";
import CheckBox from "@/components/playlist/CheckBox";

const Playlist = () => {
  const { musicFiles, videoFiles } = useUserContext();
  const [open, setopen] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedSongs, setselectedSongs] = useState<localMusicType[] | []>([]);
  const [playListName, setplayListName] = useState("");

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  // save playlist to local storage
  const savePlaylist = () => {
    console.log("the playlist is", { playListName, selectedSongs });
  };
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
        {/* bottom shit */}
        <BottomSheet
          ref={bottomSheetRef}
          onChange={handleSheetChanges}
          snapPoints={["80%"]}
          enablePanDownToClose={false}
          index={0}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.playlistForm}>
              <TextInput
                onChangeText={(val) => setplayListName(val)}
                style={{ flex: 1, borderWidth: 1, padding: 3 }}
                placeholder="Playlist name"
              />
              <Button onPress={savePlaylist} title="Save" />
            </View>
          </BottomSheetView>

          <BottomSheetFlatList
            style={{ height: 200 }}
            scrollEnabled
            data={musicFiles}
            renderItem={({ item }) => {
              return (
                <CheckBox
                  key={item.id}
                  item={item}
                  setselectedSongs={setselectedSongs}
                />
              );
            }}
          />
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    alignItems: "center",
  },
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
  playlistForm: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    // backgroundColor: "red",
    padding: 10,
  },
});
