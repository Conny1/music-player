import { ImageBackground, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { SongPlayer } from "@/components/global";

const Play = () => {
  const navigation = useNavigation();
  const route = useRouter();
  const song = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: null,
      headerStyle: {
        backgroundColor: "#1c1c1e", // Dark background color
      },
      headerTintColor: "#fff",
    });
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
        <SongPlayer />
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
