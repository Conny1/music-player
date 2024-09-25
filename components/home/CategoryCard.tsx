import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  item: { name: string; desc: string };
  place: string;
};
const CategoryCard = ({ item, place }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={{ fontWeight: 900, fontSize: 18 }}>{item.name}</Text>
      <Text>{item.desc}</Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    flexGrow: 1,
    height: 120,
    borderRadius: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
});
