import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as Progress from "react-native-progress";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserContext } from "@/hooks/context";
import { localMusicType } from "@/app/utils/types";

const Play = () => {
  const [music, setmusic] = useState<localMusicType | undefined>(undefined);
  const navigation = useNavigation();
  const route = useRouter();
  const song = useLocalSearchParams();
  const { getMusicById, playSound } = useUserContext();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: null,
      headerStyle: {
        backgroundColor: "#1c1c1e", // Dark background color
      },
      headerTintColor: "#fff",
    });
    const id = song.id as string;
    const music = getMusicById(id);
    console.log(music);
    if (!music || music.length <= 0) {
      return route.push("/home");
    } else {
      setmusic(music[0]);
      playSound(music[0].uri);
    }
  }, []);

  let bgUrl =
    "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  if (!song?.id) return route.push("/");
  return (
    <View style={{ ...styles.play }}>
      <ImageBackground
        source={{ uri: bgUrl }}
        resizeMode="cover"
        style={styles.bgimage}
      >
        <View style={styles.bgImgtopper}></View>
        <View style={styles.songInfoContainer}>
          <View style={styles.likeContainer}>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontWeight: "700",
                width: 230,
              }}
            >
              {music?.filename.substring(0, 50)}{" "}
              {music?.filename && music?.filename?.length > 50
                ? " . . ."
                : null}
            </Text>
            <AntDesign name="heart" size={24} color="#fff" />
          </View>
          <Text style={{ color: "gray", marginBottom: 30 }}>3000 days </Text>

          <View style={styles.progressContainer}>
            <Progress.Bar
              progress={0.3}
              width={300}
              color="#fff"
              borderRadius={10}
              height={2}
            />
          </View>

          <View style={styles.btnGroup}>
            <MaterialIcons name="replay" size={24} color="#fff" />
            <MaterialIcons name="arrow-left" size={48} color="#fff" />
            <MaterialIcons name="play-circle-filled" size={48} color="#fff" />
            <MaterialIcons name="arrow-right" size={48} color="#fff" />
            <MaterialIcons name="refresh" size={24} color="#fff" />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Play;

const styles = StyleSheet.create({
  play: {
    backgroundColor: "#030303",
    height: "100%",
  },
  bgimage: {
    flex: 1,
    // height: "70%"
    justifyContent: "flex-end",
    // alignItems: "baseline",
  },
  bgImgtopper: {
    flex: 1,
    backgroundColor: "#030303",
    opacity: 0.8,
    // shadowOpacity: 0.3,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  likeContainer: {
    marginTop: 50,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songInfoContainer: {
    marginHorizontal: 15,
    marginBottom: 50,
  },
  progressContainer: {},
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 30,
    alignItems: "center",
  },
});
