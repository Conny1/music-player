import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  item: { song: string; singer: string; imgurl: string };
};
const Song = ({ item }: Props) => {
  return (
    <View style={styles.songContainer}>
      <View style={styles.songInfoCon}>
        <Image
          style={{ borderRadius: 15 }}
          source={{
            uri: item.imgurl,
          }}
          height={50}
          width={50}
        />
        <View>
          <Text style={{ color: "#fff", fontSize: 15, fontWeight: 900 }}>
            {item.song}
          </Text>
          <Text style={{ color: "#fff", fontSize: 10 }}>{item.singer}</Text>
        </View>
      </View>

      <AntDesign name="caretright" size={24} color="#fff" />
    </View>
  );
};

export default Song;

const styles = StyleSheet.create({
  songContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  songInfoCon: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
