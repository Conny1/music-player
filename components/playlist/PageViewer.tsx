import { localMusicType } from "@/app/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ToastAndroid } from "react-native";
import PagerView from "react-native-pager-view";
import { VideoCard } from "../video";
import PhoneSong from "../audio/PhoneSong";
import { useUserContext } from "@/hooks/context";
import useLocalstorage from "@/hooks/Localstorage";

type Props = {
  playlistData: { [key: string]: localMusicType[] } | undefined;
  playlistName: string;
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
const PageViewer = ({
  playlistData,
  playlistName,
  setplayListkey,
  setplaylistData,
}: Props) => {
  //   console.log(playlistData);
  const { playSound } = useUserContext();
  const [triggerScroll, settriggerScroll] = useState(0);
  const { deleteData, getData } = useLocalstorage();

  const playSongOnScroll = useCallback(
    async (index: number) => {
      if (playlistData) {
        if (playlistData[playlistName]) {
          const data = playlistData[playlistName][index];
          if (data && data.mediaType === "audio") {
            await playSound(data.uri, data.id);
          }
        }
      }
    },
    [triggerScroll]
  );

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      onPageSelected={async (e) => {
        const selectedPageIndex = e.nativeEvent.position;
        settriggerScroll(selectedPageIndex);
        await playSongOnScroll(selectedPageIndex);
      }}
    >
      {playlistData &&
        playlistData[playlistName]?.map((item, i) => {
          return (
            <View key={i}>
              {item.mediaType === "video" ? (
                <VideoCard item={item} />
              ) : (
                <PhoneSong item={item} />
              )}
              <TouchableOpacity
                onPress={async () => {
                  const resp = await deleteData(item, playlistName, "media");
                  if (resp?.success) {
                    getData("playlistZeroOne(01)").then(
                      (resp: { [key: string]: localMusicType[] }) => {
                        setplayListkey(Object.keys(resp));
                        setplaylistData(resp);
                      }
                    );
                    ToastAndroid.show(resp.message, ToastAndroid.SHORT);
                  }
                }}
                style={styles.deleteBtn}
              >
                <MaterialIcons name="delete" size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,

    backgroundColor: "#4b3f3f",
  },
  deleteBtn: {
    position: "absolute",
    right: 0,
    bottom: "40%",
    marginRight: 20,
  },
});
export default PageViewer;
