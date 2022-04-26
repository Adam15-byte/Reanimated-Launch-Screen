import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import Animated, { SlideInDown, SlideInUp } from "react-native-reanimated";
import { watches } from "../../assets/imageArrays";
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from "../../assets/consts";

const DropDownImages = ({ isThirdScreen }) => {
  // state to keep track of objects in columns
  const [watchesColumns, setWatchesColumns] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
  });
  // function to add an object to a single column
  const addItemToWatchesColumns = (place, input) => {
    // check to safe proof against adding more items than desired
    if (place === 0) if (watchesColumns[place].length >= 2) return;
    if (place === 1) if (watchesColumns[place].length >= 3) return;
    if (place === 2) if (watchesColumns[place].length >= 3) return;
    if (place === 3) if (watchesColumns[place].length >= 2) return;
    setWatchesColumns((prevState) => ({
      ...prevState,
      [place]: [...prevState[place], input],
    }));
  };

  //function to filter through watches array and populate columns accordingly
  const populateColumns = () => {
    watches.map((item, index) => {
      if (index === 0) addItemToWatchesColumns(0, item);
      if (index === 1) addItemToWatchesColumns(0, item);
      if (index === 2) addItemToWatchesColumns(1, item);
      if (index === 3) addItemToWatchesColumns(1, item);
      if (index === 4) addItemToWatchesColumns(1, item);
      if (index === 5) addItemToWatchesColumns(2, item);
      if (index === 6) addItemToWatchesColumns(2, item);
      if (index === 7) addItemToWatchesColumns(2, item);
      if (index === 8) addItemToWatchesColumns(3, item);
      if (index === 9) addItemToWatchesColumns(3, item);
    });
  };
  //the function to populate columns should only be run when on the first render of this screen
  useEffect(() => {
    if (isThirdScreen === true) populateColumns();
  }, [isThirdScreen]);

  const convertIndex = (index) => {
    if (index === 0) return 2;
    if (index === 1) return 1;
    if (index === 2) return 0;
  };
  return (
    <>
      {isThirdScreen === true && (
        <View style={styles.container}>
          <View style={styles.farLeftColumn}>
            {watchesColumns[0].map((item, index) => {
              return (
                <Animated.View
                  key={`farLeftColumn-${index}`}
                  entering={SlideInUp.delay(convertIndex(index) * 100)}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              );
            })}
          </View>
          <View style={styles.leftColumn}>
            {watchesColumns[1].map((item, index) => {
              return (
                <Animated.View
                  key={`leftColumn-${index}`}
                  entering={SlideInUp.delay(convertIndex(index) * 100 + 300)}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              );
            })}
          </View>
          <View style={styles.middleColumn}>
            <Animated.View
              style={{ marginHorizontal: 5 }}
              entering={SlideInUp.delay(600)}
            >
              <AntDesign name="search1" size={36} color={COLORS.black} />
            </Animated.View>
          </View>
          <View style={styles.rightColumn}>
            {watchesColumns[2].map((item, index) => {
              return (
                <Animated.View
                  entering={SlideInUp.delay(convertIndex(index) * 100 + 700)}
                  key={`rightColumn-${index}`}
                  style={styles.searchIconContainer}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              );
            })}
          </View>
          <View style={styles.farRightColumn}>
            {watchesColumns[3].map((item, index) => {
              return (
                <Animated.View
                  entering={SlideInUp.delay(convertIndex(index) * 100 + 1000)}
                  key={`farRightColumn-${index}`}
                >
                  <Image source={item} style={styles.image} />
                </Animated.View>
              );
            })}
          </View>
        </View>
      )}
    </>
  );
};

export default DropDownImages;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginVertical: 3,
  },
  middleColumn: {
    marginVertical: 3,
  },
  searchIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
