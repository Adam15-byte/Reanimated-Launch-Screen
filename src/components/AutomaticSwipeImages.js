import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { laptops, tablets } from "../../assets/imageArrays";
import { SIZES } from "../../assets/consts";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AutomaticSwipeImages = () => {
  const [laptopsArray, setLaptopsArray] = useState([...laptops, ...laptops]);
  const [tabletsArray, setTabletsArray] = useState([...tablets, ...tablets]);
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withTiming(-500, { duration: 10000 });
  }, []);
  const animatedSelfSwipe = useAnimatedStyle(() => {
    return { transform: [{ translateX: translateX.value }] };
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.upperImages, animatedSelfSwipe]}>
        {laptopsArray.map((item, index) => (
          <Image key={`laptops-${index}`} style={styles.image} source={item} />
        ))}
      </Animated.View>
      <Animated.View style={styles.lowerImages}>
        {tabletsArray.map((item, index) => (
          <Image key={`tablets-${index}`} style={styles.image} source={item} />
        ))}
      </Animated.View>
    </View>
  );
};

export default AutomaticSwipeImages;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  upperImages: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    marginVertical: 15,
    transform: [{ translateX: -500 }],
  },
  lowerImages: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    marginVertical: 15,
    transform: [{ translateX: -50 }],
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
    borderRadius: 10,
  },
});
