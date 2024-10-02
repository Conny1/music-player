import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { VideoCard } from "@/components/video";

const Video = () => {
  const videoItem = [
    {
      id: "29",
      filename: "chapter1",
      mediaType: "video",
      uri: "videoUrl",
      duration: 100,
    },
    {
      id: "29",
      filename: "chapter1",
      mediaType: "video",
      uri: "videoUrl",
      duration: 100,
    },
    {
      id: "29",
      filename: "chapter1",
      mediaType: "video",
      uri: "videoUrl",
      duration: 100,
    },
    {
      id: "29",
      filename: "chapter1",
      mediaType: "video",
      uri: "videoUrl",
      duration: 100,
    },
    {
      id: "29",
      filename: "chapter1",
      mediaType: "video",
      uri: "videoUrl",
      duration: 100,
    },
  ];
  return (
    <View style={styles.libraryContainer}>
      <View style={styles.addContainer}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 600,

            color: "#fff",
          }}
        >
          Your Video
        </Text>
        <TouchableOpacity style={styles.addBtn}>
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={{ color: "#fff", textAlign: "center" }}>Add folder</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginTop: 20 }}
        data={videoItem}
        renderItem={({ item }) => <VideoCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2} // Display 2 cards per row
        columnWrapperStyle={styles.row} // Apply styles for rows
        showsVerticalScrollIndicator={false} // Hide vertical scrollbar if needed
      />
    </View>
  );
};

export default Video;

const styles = StyleSheet.create({
  row: {
    justifyContent: "space-evenly", // Space cards evenly across the row
    marginBottom: 10, // Space between rows
  },
  libraryContainer: {
    backgroundColor: "#030303",
    height: "100%",
  },

  addContainer: {
    marginTop: 50,
    marginHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addBtn: {
    backgroundColor: "#1c1c1e",
    padding: 3,
    borderRadius: 30,
    width: 120,
    flexDirection: "row",
    gap: 10,
  },
  videoList: {
    flexDirection: "row", // Arrange items horizontally
    flexWrap: "nowrap", // Disable wrapping
    overflow: "hidden", // Prevent overflow of content
  },
});
