import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import SearchedCard from "@/components/search/SearchedCard";
import BasedonLikedCard from "@/components/search/BaseonLikedCard";
import { useUserContext } from "@/hooks/context";
import { SongPlayer } from "@/components/global";

const Search = () => {
  const { isMusicPlaying } = useUserContext();

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

  const likesBased = [
    {
      music: "Indie mix",
    },
    {
      music: "Music mix",
    },
    {
      music: "Pop mix",
    },
    {
      music: "Chill mix",
    },
    {
      music: "Reggae mix",
    },
    {
      music: "indie mix",
    },
  ];
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
        Based on what you like
      </Text>
      <View style={styles.basedOnlikesContainer}>
        <FlatList
          data={likesBased}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <BasedonLikedCard key={index} item={item} />
          )}
        />
      </View>
      {isMusicPlaying && (
        <View style={styles.playerContainer}>
          <SongPlayer />
        </View>
      )}
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
