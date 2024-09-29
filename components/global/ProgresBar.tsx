import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as Progress from "react-native-progress";

type Props = {
  duration: number | undefined; // Total duration of the song in milliseconds
};

const ProgresBar = ({ duration }: Props) => {
  const [barProgress, setBarProgress] = useState(0);
  console.log(duration, barProgress);

  useEffect(() => {
    setBarProgress(0);
    if (duration) {
      if (duration > 0) {
        const interval = setInterval(() => {
          setBarProgress((prevProgress) => {
            const newProgress = prevProgress + 1 / duration; // Increment by 1 second
            return newProgress > 1 ? 1 : newProgress; // Cap progress at 1 (100%)
          });
        }, 1000); // Update progress every 1 second

        // Clear interval when the component unmounts or the duration changes
        return () => clearInterval(interval);
      }
    }
  }, [duration]);

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
