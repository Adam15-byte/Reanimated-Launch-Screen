import { StatusBar } from 'expo-status-bar';
import react, { useState, useRef, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { COLORS, SIZES, FONTS } from "./assets/consts";
import { TitlesData } from "./assets/dummyData";
import LogRegisterButton from "./src/components/LogRegisterButton";
import AutomaticSwipeImages from "./src/components/AutomaticSwipeImages";
import ImagesScatter from "./src/components/ImagesScatter";
import DropDownImages from "./src/components/DropDownImages";
import SquareUnfold from "./src/components/SquareUnfold";

export default function App() {
  // handling of "onViewableItemsChanged" prop to determine the screen scrolled to
  const [isSecondScreen, setIsSecondScreen] = useState(false);
  const [isThirdScreen, setIsThirdScreen] = useState(false);
  const [isFourthScreen, setIsFourthScreen] = useState(false);
  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    if (viewableItems[0].index === 1) {
      setIsSecondScreen(true);
    } else if (viewableItems[0].index === 2) {
      setIsThirdScreen(true);
    } else if (viewableItems[0].index === 3) {
      setIsFourthScreen(true);
    }
  });
  // State to keep track of scrolling
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translateX.value = event.contentOffset.x;
  });
  // Render of the item for FlatList, representing single page
  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.singleScreenContainer}>
        <View style={styles.animationImagesContainer}>
          {/* Render of View with the animation depending on the index */}

          {index === 0 && <AutomaticSwipeImages />}
          {index === 1 && <ImagesScatter isSecondScreen={isSecondScreen} />}
          {index === 2 && <DropDownImages isThirdScreen={isThirdScreen} />}
          {index === 3 && <SquareUnfold isFourthScreen={isFourthScreen} />}
        </View>
        <View style={styles.titlesContainer}>
          {/* Render of scrollable texts */}

          <Text style={{ ...FONTS.h1 }}>{item.title}</Text>
          <Text
            style={{
              ...FONTS.h3,
              color: "grey",
              textAlign: "center",
              marginTop: 10,
              marginHorizontal: 30,
            }}
          >
            {item.subtitle}
          </Text>
        </View>
      </View>
    );
  };

  // Dots animation below the title & subtitle texts
  const Dots = useCallback(() => {
    return (
      <View style={styles.dotContainer}>
        {TitlesData.map((_, index) => {
          const animatedDotStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              translateX.value,
              [
                (index - 1) * SIZES.SCREEN_WIDTH,
                index * SIZES.SCREEN_WIDTH,
                (index + 1) * SIZES.SCREEN_WIDTH,
              ],
              [0.3, 1, 0.3],
              Extrapolate.CLAMP
            );
            return { opacity };
          });
          return (
            <Animated.View
              key={`Dot-${index}`}
              style={[styles.singleDot, animatedDotStyle]}
            />
          );
        })}
      </View>
    );
  }, []);
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={TitlesData}
        renderItem={renderItem}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        bounces={false}
        keyExtractor={(_, index) => index}
        onScroll={scrollHandler}
        onViewableItemsChanged={onViewChangeRef.current}
      />
      <View style={styles.bottomTabContainer}>
        <Dots />
        <LogRegisterButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SIZES.SCREEN_WIDTH,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  singleScreenContainer: {
    height: SIZES.SCREEN_HEIGHT * 0.75,
    width: SIZES.SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  animationImagesContainer: {
    width: SIZES.SCREEN_WIDTH,
    height: "70%",
  },
  titlesContainer: {
    height: 80,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bottomTabContainer: {
    width: SIZES.SCREEN_WIDTH,
    height: SIZES.SCREEN_HEIGHT * 0.25,
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 15,
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 25,
  },
  dotContainer: {
    flexDirection: "row",
    width: "30%",
    height: 50,
    alignItems: "center",
    justifyContent: "space-around",
  },
  singleDot: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: COLORS.purple,
  },
});
