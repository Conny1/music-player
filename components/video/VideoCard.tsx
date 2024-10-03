import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, useRouter } from "expo-router";
import { localVideoType } from "@/app/utils/types";

type Props = {
  item: localVideoType;
};
const VideoCard = ({ item }: Props) => {
  const route = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        const path = `/videoPlayer/play/${item.id}` as Href<string>;
        route.push(path);
      }}
      style={styles.videoInfoCon}
    >
      <Image
        style={{ borderRadius: 15, height: 100, width: 150 }} // Add the height and width here
        source={{
          uri: "https://cdn.iconscout.com/icon/free/png-512/free-music-icon-download-in-svg-png-gif-file-formats--player-mp-song-audio-dj-user-interface-vol-2-pack-icons-14874.png?f=webp&w=256",
        }}
        resizeMode="cover" // Use resizeMode for controlling image fitting
      />

      <View>
        <Text style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>
          {item.filename.substring(0, 50)}{" "}
          {item.filename.length > 50 ? " . . ." : null}
        </Text>
        <View style={styles.musicDetails}>
          <Text style={{ color: "#fff", fontSize: 10 }}>{item.mediaType}</Text>
          <Text style={{ color: "#fff", fontSize: 10 }}>
            {(item.duration / 60).toFixed(2)} min
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  videoInfoCon: {
    flex: 1,
    maxWidth: 150,
    // height: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  musicDetails: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});
