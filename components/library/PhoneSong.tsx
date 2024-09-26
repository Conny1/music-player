import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Href, useRouter } from "expo-router";

type Props = {
  item: { song: string; singer: string; imgurl: string };
};
const PhoneSong = ({ item }: Props) => {
  const navigation = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        const path = "/music/play/musicid" as Href<string>;
        navigation.push(path);
      }}
      style={styles.songContainer}
    >
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
    </TouchableOpacity>
  );
};

export default PhoneSong;

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
