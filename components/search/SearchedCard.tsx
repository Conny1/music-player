import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = {
  item: { title: string; category: string; imgurl: string };
};
const SearchedCard = ({ item }: Props) => {
  return (
    <View style={styles.searchedCardContainer}>
      <View style={styles.searchedCardInfoCon}>
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
            {item.title}
          </Text>
          <Text style={{ color: "#fff", fontSize: 10 }}>{item.category}</Text>
        </View>
      </View>

      <AntDesign name="right" size={24} color="#fff" />
    </View>
  );
};

export default SearchedCard;

const styles = StyleSheet.create({
  searchedCardContainer: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  searchedCardInfoCon: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
});
