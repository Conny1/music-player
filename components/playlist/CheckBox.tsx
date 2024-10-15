import { Image, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { localMusicType } from "@/app/utils/types";
import Fontisto from "@expo/vector-icons/Fontisto";
import * as VideoThumbnails from "expo-video-thumbnails";

type Props = {
  item: localMusicType;
  setselectedMedia: React.Dispatch<React.SetStateAction<[] | localMusicType[]>>;
  isVideo: boolean;
  checked?: boolean;
  open: number;
};

const CheckBox = ({
  item,
  setselectedMedia,
  isVideo,
  checked,
  open,
}: Props) => {
  const [isChecked, setChecked] = useState(checked);
  const [thumUrl, setthumUrl] = useState("");
  const generateThumbnail = useCallback(async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(item.uri, {
        time: 15000,
      });
      setthumUrl(uri);
    } catch (e) {
      console.warn(e);
    }
  }, []);

  useEffect(() => {
    if (isVideo) {
      generateThumbnail();
    }
    if (open && open === -1 && checked === undefined) {
      setChecked(false);
    }
  }, [open]);
  let palceHoledr =
    "https://images.unsplash.com/photo-1724086575243-6796fc662673?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <View style={styles.checkboxContainer}>
      <Checkbox
        style={styles.checkbox}
        value={isChecked}
        onValueChange={(val) => {
          console.log(val);
          if (val) {
            setselectedMedia((prev) => {
              // console.log(prev);
              return [...prev, item];
            });
            setChecked(true);
          } else {
            setselectedMedia((prev) => {
              // console.log(prev);
              return prev.filter((song) => song.id !== item.id);
            });
            setChecked(false);
          }
        }}
        color={isChecked ? "#4630EB" : undefined}
      />
      <View style={styles.mediaInfo}>
        {isVideo ? (
          <Image
            style={{ borderRadius: 15, height: 54, width: 50 }} // Add the height and width here
            source={{
              uri: thumUrl ? thumUrl : palceHoledr,
            }}
            resizeMode="cover" // Use resizeMode for controlling image fitting
          />
        ) : (
          <Fontisto name="applemusic" size={50} color="black" />
        )}

        <Text style={{ width: "80%" }}>
          {item.filename.substring(0, 70)}...{" "}
        </Text>
      </View>
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
  mediaInfo: {
    width: "85%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 5,
  },
});
