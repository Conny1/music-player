import {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { localMusicType } from "@/app/utils/types";
import PageViewer from "./PageViewer";
import useLocalstorage from "@/hooks/Localstorage";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  item: String;
  playlistData: { [key: string]: localMusicType[] } | undefined;
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
const PlaylistCard = ({
  item,
  playlistData,
  setplayListkey,
  setplaylistData,
}: Props) => {
  const { deleteData, getData } = useLocalstorage();

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item}</Text>
        <TouchableOpacity
          onPress={async () => {
            const resp = await deleteData(null, item as string, "playlist");
            if (resp?.success) {
              ToastAndroid.show(resp.message, ToastAndroid.SHORT);

              getData("playlistZeroOne(01)").then(
                (resp: { [key: string]: localMusicType[] }) => {
                  setplayListkey(Object.keys(resp));
                  setplaylistData(resp);
                }
              );
            }
          }}
        >
          <MaterialIcons name="delete" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.pageViewerContainer}>
        <PageViewer
          playlistData={playlistData}
          playlistName={item as string}
          setplayListkey={setplayListkey}
          setplaylistData={setplaylistData}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 14,
    // width: 250,
    marginVertical: 10,
    height: 250,
    alignItems: "center",
  },
  innerCard: {},
  header: {
    // marginBottom: 16,
    alignItems: "center",
    flexDirection: "row",
    gap: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "green",
  },
  pageViewerContainer: {
    flex: 1,
    width: "100%",
  },
});

export default PlaylistCard;
