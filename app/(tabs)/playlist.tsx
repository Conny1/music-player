import {
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
import CheckBox from "@/components/playlist/CheckBox";
import useLocalstorage from "@/hooks/Localstorage";

const Playlist = () => {
  const { musicFiles, videoFiles } = useUserContext();
  const [open, setopen] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMedia, setselectedMedia] = useState<localMusicType[] | []>([]);
  const [playListName, setplayListName] = useState("");
  const [isVideo, setisVideo] = useState(false);
  const { getData, storeData } = useLocalstorage();
  const [playListsCard, setplayListsCard] = useState();

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
    },
    [open]
  );
  useEffect(() => {
    getData("playlistZeroOne(01)").then((resp) => {
      console.log(resp);
    });
  }, []);

  // save playlist to local storage
  const savePlaylist = async () => {
    if (!playListName || selectedMedia.length === 0) {
      if (!playListName) {
        return alert("Title is required");
      } else {
        return alert(`Select at least one ${isVideo ? "video" : "music"}`);
      }
    } else {
      const data = await storeData(selectedMedia, playListName);
      const text = data?.message as string;
      if (text) {
        ToastAndroid.show(text, ToastAndroid.SHORT);
      }
    }
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
          enablePanDownToClose={true}
          index={Number(open)}
        >
          <BottomSheetView style={styles.contentContainer}>
            <View style={styles.playlistForm}>
              <TextInput
                onChangeText={(val) => setplayListName(val)}
                style={{ flex: 1, borderWidth: 1, padding: 3 }}
                placeholder="Playlist name"
              />
              <Pressable onPress={savePlaylist} style={styles.button}>
                <Text style={{ color: "#fff" }}>Save</Text>
              </Pressable>
            </View>
            <View style={styles.btnGroup}>
              <TouchableOpacity
                onPress={() => {
                  setisVideo(false);
                  setselectedMedia([]);
                }}
                style={{
                  flex: 1,
                  backgroundColor: !isVideo ? "#ffff" : "#3a7ff9",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: !isVideo ? "#000" : "#ffff",
                  }}
                >
                  Audio
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setisVideo(true);
                  setselectedMedia([]);
                }}
                style={{
                  flex: 1,
                  backgroundColor: isVideo ? "#ffff" : "#3a7ff9",
                  padding: 5,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isVideo ? "#000" : "#ffff",
                  }}
                >
                  Video
                </Text>
              </TouchableOpacity>
            </View>
          </BottomSheetView>

          <BottomSheetFlatList
            style={{ height: 200 }}
            scrollEnabled
            data={isVideo ? videoFiles : musicFiles}
            renderItem={({ item }) => {
              return (
                <CheckBox
                  key={item.id}
                  item={item}
                  setselectedMedia={setselectedMedia}
                  isVideo={isVideo}
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
    // gap: 5,
    // backgroundColor: "red",
    padding: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    paddingHorizontal: 32,
    // borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },

  btnGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    width: "100%",
  },
});
