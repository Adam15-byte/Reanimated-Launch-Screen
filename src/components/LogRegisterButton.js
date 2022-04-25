import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS } from "../../assets/consts";

const LogRegisterButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.leftButton}
        onPress={() => console.log("leftClick")}
      >
        <Text style={styles.leftText}>Join Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.rightButton}
        onPress={() => console.log("rightClick")}
      >
        <Text style={styles.rightText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogRegisterButton;

const styles = StyleSheet.create({
  container: {
    width: SIZES.SCREEN_WIDTH * 0.9,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: COLORS.lightpurple,
  },
  leftButton: {
    width: "50%",
    height: "100%",
    backgroundColor: COLORS.lightpurple,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  rightButton: {
    width: "50%",
    height: "100%",
    backgroundColor: COLORS.purple,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  leftText: {
    ...FONTS.h2,
    color: COLORS.purple,
  },
  rightText: {
    ...FONTS.h2,
    color: COLORS.white,
  },
});
