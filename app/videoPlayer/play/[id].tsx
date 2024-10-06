import { useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useUserContext } from "@/hooks/context";
import { useLocalSearchParams } from "expo-router";
import { localVideoType } from "@/app/utils/types";

export default function VideoPlayer() {
  const { getVideoById } = useUserContext();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({});
  const videoId = useLocalSearchParams();
  const [media, setmedia] = useState<localVideoType>();
  useEffect(() => {
    const id = videoId.id as string;
    setmedia(getVideoById(id)[0]);
  }, []);

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: media?.uri as string,
        }}
        shouldPlay={true}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        onError={(error) => console.log(error)}
      />
      <View style={styles.buttons}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#1c1c1e",
  },
  video: {
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
