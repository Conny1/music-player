import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";

import { Href, useRouter } from "expo-router";
import { localVideoType } from "@/app/utils/types";
import * as VideoThumbnails from "expo-video-thumbnails";

type Props = {
  item: localVideoType;
};
const VideoCard = ({ item }: Props) => {
  const [thumUrl, setthumUrl] = useState("");
  const route = useRouter();
  const generateThumbnail = useCallback(async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(item.uri, {
        time: 15000,
      });
      setthumUrl(uri);
    } catch (e) {
      console.warn(e);
    }
  }, [item]);
  useEffect(() => {
    generateThumbnail();
  }, []);
  let palceHoledr =
    "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
          uri: thumUrl ? thumUrl : palceHoledr,
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
