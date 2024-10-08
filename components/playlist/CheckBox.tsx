import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Checkbox from "expo-checkbox";
import { localMusicType } from "@/app/utils/types";
type Props = {
  item: localMusicType;
  setselectedSongs: React.Dispatch<React.SetStateAction<[] | localMusicType[]>>;
};

const CheckBox = ({ item, setselectedSongs }: Props) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={(val) => {
          if (val) {
            setselectedSongs((prev) => [...prev, item]);
            setChecked(true);
          } else {
            setselectedSongs((prev) =>
              prev.filter((song) => song.id !== item.id)
            );
            setChecked(false);
          }
        }}
        color={isChecked ? "#4630EB" : undefined}
      />
      <Text style={{ width: "80%" }}>{item.filename.substring(0, 70)}... </Text>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  checkbox: {
    margin: 8,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginVertical: 20,
  },
});
