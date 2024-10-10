import { localMusicType } from "@/app/utils/types";
import { Fontisto } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PagerView from "react-native-pager-view";
import * as VideoThumbnails from "expo-video-thumbnails";
import { VideoCard } from "../video";
import PhoneSong from "../audio/PhoneSong";

type Props = {
  playlistData: { [key: string]: localMusicType[] } | undefined;
  item: string;
};
const PageViewer = ({ playlistData, item }: Props) => {
  //   console.log(playlistData);

  const generateThumbnail = async (url: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(url, {
        time: 15000,
      });

      return uri;
    } catch (e) {
      console.warn(e);
      return "";
    }
  };

  let palceHoledr =
    "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {playlistData &&
        playlistData[item]?.map((item, i) => {
          return (
            <View key={i}>
              {item.mediaType === "video" ? (
                <VideoCard item={item} />
              ) : (
                <PhoneSong item={item} />
              )}
            </View>
          );
        })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: "#000",
  },
});
export default PageViewer;
