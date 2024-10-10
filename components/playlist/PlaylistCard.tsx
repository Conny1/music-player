import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { localMusicType } from "@/app/utils/types";
import PageViewer from "./PageViewer";

type Props = {
  item: String;
  playlistData: { [key: string]: localMusicType[] } | undefined;
};
const PlaylistCard = ({ item, playlistData }: Props) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{item}</Text>
      </View>
      <View style={styles.pageViewerContainer}>
        <PageViewer playlistData={playlistData} item={item as string} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 5,
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
    marginBottom: 16,
    alignItems: "center",
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
