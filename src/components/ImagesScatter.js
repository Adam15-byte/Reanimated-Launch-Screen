import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { SIZES, COLORS } from "../../assets/consts";
import { headphones } from "../../assets/imageArrays";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const IMAGE_WIDTH = 90;
const IMAGE_HEIGHT = 120;
const ImagesScatter = ({ isSecondScreen }) => {
  const translate = useSharedValue(0);

  useEffect(() => {
    if (isSecondScreen === true) translate.value = withSpring(50);
  }, [isSecondScreen]);

  const animatedImage1 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translate.value },
        { translateY: translate.value },
      ],
    };
  });
  const animatedImage2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -0.2 * translate.value },
        { translateY: 1.2 * translate.value },
      ],
    };
  });
  const animatedImage3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -1.1 * translate.value },
        { translateY: 1.1 * translate.value },
      ],
    };
  });
  const animatedImage4 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -1 * translate.value },
        { translateY: -0.3 * translate.value },
      ],
    };
  });
  const animatedImage5 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: -0.7 * translate.value },
        { translateY: -1.3 * translate.value },
      ],
    };
  });
  const animatedImage6 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 0.5 * translate.value },
        { translateY: -0.7 * translate.value },
      ],
    };
  });
  const animatedImage7 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: 1.1 * translate.value },
        { translateY: 0.2 * translate.value },
      ],
    };
  });
  return (
    <View style={styles.container}>
      {headphones.map((item, index) => {
        return (
          <Animated.View
            key={`headphones-${index}`}
            style={[
              styles.imageContainer,
              index === 1 && animatedImage1,
              index === 2 && animatedImage2,
              index === 3 && animatedImage3,
              index === 4 && animatedImage4,
              index === 5 && animatedImage5,
              index === 6 && animatedImage6,
              index === 7 && animatedImage7,
            ]}
          >
            <Image
              source={item}
              style={[
                //state for images
                styles.image,
                //individual style to position each image in the array
                index === 1 && { ...styles.image1 },
                index === 2 && { ...styles.image2 },
                index === 3 && { ...styles.image3 },
                index === 4 && { ...styles.image4 },
                index === 5 && { ...styles.image5 },
                index === 6 && { ...styles.image6 },
                index === 7 && { ...styles.image7 },
              ]}
            />
          </Animated.View>
        );
      })}
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
  imageContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    top: 20,
  },
  image: {
    position: "absolute",
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
    borderRadius: 15,
  },
  image1: {
    bottom: 90,
    right: 100,
    transform: [{ scale: 0.8 }],
  },
  image2: {
    bottom: 80,
    right: 160,
    transform: [{ scale: 0.8 }],
  },
  image3: {
    bottom: 110,
    left: 110,
    transform: [{ scale: 0.9 }],
  },
  image4: {
    bottom: 170,
    left: 80,
    transform: [{ scale: 0.8 }],
  },
  image5: {
    top: 80,
    left: 110,
  },
  image6: {
    top: 70,
    left: 190,
    transform: [{ scale: 0.9 }],
  },
  image7: {
    top: 130,
    right: 80,
    transform: [{ scale: 0.8 }],
  },
});
