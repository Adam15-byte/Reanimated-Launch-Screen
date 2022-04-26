import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { drones } from "../../assets/imageArrays";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from "react-native-reanimated";

const SquareUnfold = ({ isFourthScreen }) => {
  const translateX1 = useSharedValue(-150);
  const translateX2 = useSharedValue(0);
  const translateY2 = useSharedValue(-150);
  const translateX3 = useSharedValue(-150);
  const translateY3 = useSharedValue(-150);
  const animatedStyle1 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX1.value }],
    };
  });
  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX2.value },
        { translateY: translateY2.value },
      ],
    };
  });
  const animatedStyle3 = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX3.value },
        { translateY: translateY3.value },
      ],
    };
  });
  const transform2 = () => {
    translateX2.value = withTiming(150, { duration: 1000 });
    translateY2.value = withDelay(1100, withTiming(0, { duration: 1000 }));
    translateX2.value = withDelay(2200, withTiming(0, { duration: 1000 }));
  };
  const transform3 = () => {
    translateX3.value = withTiming(0, { duration: 1000 });
    translateY3.value = withDelay(1100, withTiming(0, { duration: 1000 }));
  };

  useEffect(() => {
    if (isFourthScreen) translateX1.value = withTiming(0, { duration: 1000 });
    if (isFourthScreen) transform2();
    if (isFourthScreen) transform3();
  }, [isFourthScreen]);
  const indexTransformForZindex = (index) => {
    const result = 4 - index;
    return result;
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperRow}>
        {drones.map((item, index) => {
          return (
            <View
              key={`squareUpper-${index}`}
              style={{ zIndex: indexTransformForZindex(index) }}
            >
              {index < 2 && (
                <Animated.View
                  style={[styles.imageContainer, index === 1 && animatedStyle1]}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>
      <View style={styles.lowerRow}>
        {drones.map((item, index) => {
          return (
            <View
              key={`squareLower-${index}`}
              style={{ zIndex: indexTransformForZindex(index) }}
            >
              {index >= 2 && (
                <Animated.View
                  style={[
                    styles.imageContainer,
                    index === 2 && animatedStyle2,
                    index === 3 && animatedStyle3,
                  ]}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default SquareUnfold;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  imageContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  upperRow: {
    flexDirection: "row",
  },
  lowerRow: {
    flexDirection: "row",
  },
});
