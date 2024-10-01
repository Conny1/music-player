import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { genraType } from "@/app/utils/types";

type Props = {
  item: genraType;
};
const BasedonLikedCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: item.picture_medium }}
        resizeMode="cover"
        style={styles.bgImg}
      >
        <Text style={{ fontWeight: 900, fontSize: 18 }}>{item.name}</Text>
      </ImageBackground>
    </View>
  );
};

export default BasedonLikedCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexGrow: 2,
    // maxWidth: "45%",
    height: 120,
    borderRadius: 15,

    marginVertical: 5,
    overflow: "hidden",
  },
  bgImg: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
