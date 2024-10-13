import { localMusicType } from "@/app/utils/types";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ToastAndroid } from "react-native";
import PagerView from "react-native-pager-view";
import { VideoCard } from "../video";
import PhoneSong from "../audio/PhoneSong";
import { useUserContext } from "@/hooks/context";
import useLocalstorage from "@/hooks/Localstorage";
import { ProgressBar } from "../global";

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
  const {
    playingMusic,
    isPause,
    prev,
    next,
    playSound,
    setisPause,
    nextSong,
    setnext,
    setprev,
    setMusicFiles,
  } = useUserContext();
  const [triggerScroll, settriggerScroll] = useState(0);
  const { deleteData, getData } = useLocalstorage();
  const [nextSlide, setnextSlide] = useState(0);
  const pagerRef = useRef<PagerView>(null); // Create a ref for PagerView

  const playSongOnScroll = useCallback(
    async (index: number) => {
      if (playlistData) {
        if (playlistData[playlistName]) {
          const data = playlistData[playlistName][index];
          if (data && data.mediaType === "audio") {
            await playSound(data.uri, data.id);
            setMusicFiles(playlistData[playlistName]);
          }
        }
      }
    },
    [triggerScroll]
  );

  useEffect(() => {
    if (pagerRef.current) {
      pagerRef.current.setPage(nextSlide); // Set page index using ref
    }
    console.log(playingMusic, "next lodes", nextSlide);
  }, [playingMusic]);

  const playNextSong = () => {
    const id = playingMusic[0]?.id as string;
    const nextMusic = nextSong(id);
    playSound(nextMusic.uri, nextMusic.id);
    // setmusic(nextMusic);
    setnext(true);
    setprev(true);
    setisPause(false);
  };

  return (
    <PagerView
      ref={pagerRef}
      style={styles.pagerView}
      initialPage={0}
      onPageSelected={async (e) => {
        const selectedPageIndex = e.nativeEvent.position;
        settriggerScroll(selectedPageIndex);
        setnextSlide(selectedPageIndex);
        await playSongOnScroll(selectedPageIndex);
        if (playlistData) {
          setMusicFiles(playlistData[playlistName]);
        }
      }}
    >
      {playlistData &&
        playlistData[playlistName]?.map((item, i) => {
          return (
            <View key={i} style={styles.maniContainer}>
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

              {item.mediaType === "audio" &&
                playingMusic[0]?.id === item?.id && (
                  <View style={styles.progressContainer}>
                    <ProgressBar
                      duration={item.duration}
                      isPause={isPause}
                      next={next}
                      prev={prev}
                      playNextSong={playNextSong}
                      setnextSlide={setnextSlide}
                    />
                  </View>
                )}
            </View>
          );
        })}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  maniContainer: {
    display: "flex",
  },
  progressContainer: {
    alignSelf: "center",
    marginTop: 80,
  },

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
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    alignItems: "center",
  },
});
export default PageViewer;
