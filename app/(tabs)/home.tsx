import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import CategoryCard from "@/components/home/CategoryCard";
import Song from "@/components/home/Song";

const Home = () => {
  const category = [
    {
      name: "Chill ",
      desc: "Study Beats",
    },
    {
      name: "Jazzy ",
      desc: "Rainy Morning",
    },
    {
      name: "Weekend ",
      desc: "Skate punk",
    },
  ];

  const foryou = [
    {
      name: "Your top ",
      desc: "Artists",
    },
    {
      name: "Best of ",
      desc: "Office Music",
    },
  ];
  const songs = [
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      song: "call living",
      singer: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  return (
    <View style={styles.home}>
      {/* pick uo */}
      <View style={styles.pickUpContainer}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Pick up where you left off
        </Text>
        <TouchableOpacity style={styles.viewallbtn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {category.map((item, i) => {
          return <CategoryCard key={i} item={item} place="pickup" />;
        })}
      </View>
      {/* for you */}

      <View style={styles.forYouCon}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          For You
        </Text>
        <TouchableOpacity style={styles.viewallbtn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>View all</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {foryou.map((item, i) => {
          return <CategoryCard key={i} item={item} place="foryou" />;
        })}
      </View>
      {/* popular songs */}
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
          marginHorizontal: 15,
        }}
      >
        Popular songs
      </Text>
      <View style={styles.songListCon}>
        <FlatList
          data={songs}
          renderItem={({ item, index }) => <Song key={index} item={item} />}
        />
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
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginHorizontal: 15,
  },
  forYouCon: {
    marginHorizontal: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  songListCon: {
    height: 400,
  },
});
