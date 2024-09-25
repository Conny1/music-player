import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  item: { music: string };
};
const BasedonLikedCard = ({ item }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={{ fontWeight: 900, fontSize: 18 }}>{item.music}</Text>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 5,
  },
});
