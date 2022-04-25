import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS } from "../../assets/consts";

const ImagesScatter = ({ isSecondScreen }) => {
  useEffect(() => {
    if (isSecondScreen === true) {
      null;
    } else {
      null;
    }
  }, [isSecondScreen]);
  return (
    <View style={styles.container}>
      <Text>ImagesScatter</Text>
    </View>
  );
};

export default ImagesScatter;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});
