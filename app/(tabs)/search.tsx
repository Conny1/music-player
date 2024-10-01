import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchedCard from "@/components/search/SearchedCard";
import BasedonLikedCard from "@/components/search/BaseonLikedCard";
import { useUserContext } from "@/hooks/context";
import { SongPlayer } from "@/components/global";
import { genraType } from "../utils/types";

const Search = () => {
  const { isMusicPlaying, getMusicGenre } = useUserContext();
  const [genre, setgenre] = useState<genraType[] | []>([]);

  const searchResults = [
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "call living",
      category: "Tom",
      imgurl:
        "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  useEffect(() => {
    getMusicGenre()
      .then((item) => {
        setgenre(item);
        console.log(item);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.search}>
      <TextInput
        style={{
          backgroundColor: "#fff",
          margin: 20,
          marginTop: 50,
          padding: 10,
          borderRadius: 10,
        }}
        placeholder="search"
      />
      {/* recent searches */}
      <View style={styles.recentSearchesContainer}>
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "700" }}>
          Recent searches
        </Text>
        <TouchableOpacity style={styles.clear}>
          <Text style={{ color: "#fff", textAlign: "center" }}>Clear</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.resultsList}>
        <FlatList
          data={searchResults}
          renderItem={({ item, index }) => (
            <SearchedCard key={index} item={item} />
          )}
        />
      </View>
      <Text
        style={{
          color: "#fff",
          fontSize: 20,
          fontWeight: "700",
          marginHorizontal: 15,
        }}
      >
        Music by genre
      </Text>
      <View style={styles.basedOnlikesContainer}>
        <FlatList
          data={genre}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BasedonLikedCard key={item.id} item={item} />
          )}
        />
      </View>
      {/* {isMusicPlaying && (
        <View style={styles.playerContainer}>
          <SongPlayer />
        </View>
      )} */}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  search: {
    backgroundColor: "#030303",
    height: "100%",
  },
  recentSearchesContainer: {
    marginHorizontal: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  clear: {
    backgroundColor: "#1c1c1e",
    padding: 3,
    borderRadius: 30,
    width: 70,
  },
  resultsList: {
    maxHeight: 280,
  },
  basedOnlikesContainer: {
    marginHorizontal: 15,
    height: 300,
  },
  playerContainer: {
    backgroundColor: "#221010",
    position: "absolute",

    bottom: 0,
    width: "auto",
    borderRadius: 20,
    // marginHorizontal: 20,
    left: 0,
    right: 0,
  },
});
