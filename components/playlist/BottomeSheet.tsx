import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { localMusicType } from "@/app/utils/types";
import useLocalstorage from "@/hooks/Localstorage";
import CheckBox from "@/components/playlist/CheckBox";
import { useUserContext } from "@/hooks/context";
type Props = {
  open: number;
  setplaylistData: React.Dispatch<
    React.SetStateAction<
      | {
          [key: string]: localMusicType[];
        }
      | undefined
    >
  >;
  setplayListkey: React.Dispatch<React.SetStateAction<[] | String[]>>;
};
const BottomeSheet = ({ open, setplayListkey, setplaylistData }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedMedia, setselectedMedia] = useState<localMusicType[] | []>([]);
  const [playListName, setplayListName] = useState("");
  const [isVideo, setisVideo] = useState(false);
  const { storeData, getData } = useLocalstorage();
  const { musicFiles, videoFiles } = useUserContext();

  // callbacks

  useEffect(() => {
    getData("playlistZeroOne(01)").then(
      (resp: { [key: string]: localMusicType[] }) => {
        setplayListkey(Object.keys(resp));
        setplaylistData(resp);
      }
    );
  }, []);

  const handleSheetChanges = useCallback(
    (index: number) => {
      console.log("handleSheetChanges", index);
    },
    [open]
  );

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
  );
};

export default BottomeSheet;

const styles = StyleSheet.create({
  bottomeSheetContainer: {
    backgroundColor: "#030303",
    height: "100%",
  },
  contentContainer: {
    // flex: 1,
    alignItems: "center",
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
    justifyContent: "space-between",
    gap: 5,
    height: 40,
  },
});
