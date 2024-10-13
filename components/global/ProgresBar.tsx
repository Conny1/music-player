import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";
import { useUserContext } from "@/hooks/context";

type Props = {
  duration: number | undefined; // Total duration of the song in milliseconds
  isPause: boolean;
  next: boolean;
  prev: boolean;
  playNextSong: () => void;
  setnextSlide?: (value: React.SetStateAction<number>) => void;
};

const ProgresBar = ({
  duration,
  isPause,
  next,
  prev,
  playNextSong,
  setnextSlide,
}: Props) => {
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    if (next && prev) {
      setBarProgress(0);
      if (setnextSlide) {
        setnextSlide((prev) => prev + 1);
      }
    }
    let interval: NodeJS.Timeout | undefined;
    if (duration) {
      if (duration > 0 && !isPause) {
        interval = setInterval(() => {
          setBarProgress((prevProgress) => {
            const newProgress = prevProgress + 1 / duration; // Increment by 1 second
            // console.log(newProgress);

            return newProgress > 1 ? 1 : newProgress; // Cap progress at 1 (100%)
          });
        }, 1000); // Update progress every 1 second

        // Clear interval when the component unmounts or the duration changes
        return () => clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    }
  }, [duration, isPause, next, prev]);
  useEffect(() => {
    // console.log(barProgress, isPause);
    if (barProgress >= 1) {
      playNextSong();
    }
  }, [barProgress]);

  return (
    <Progress.Bar
      progress={barProgress}
      width={300}
      color="#fff"
      borderRadius={10}
      height={2}
    />
  );
};

export default ProgresBar;

const styles = StyleSheet.create({});
