import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Home = () => {
  return (
    <View style={styles.home}>
      <View style={styles.pickUpContainer}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Pick up whre you left off
        </Text>
        <TouchableOpacity style={styles.viewallbtn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>View all</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  pickUpContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  home: {
    backgroundColor: "#030303",
    height: "100%",
  },
  viewallbtn: {
    backgroundColor: "#1c1c1e",
    padding: 3,
    borderRadius: 30,
    width: 70,
  },
});
