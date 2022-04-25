import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const COLORS = {
  white: "#ffffff",
  black: "#000000",
  purple: "#503382",
  lightpurple: "#d5c4f2",
};

export const SIZES = {
  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,
};

export const FONTS = {
  h1: { fontSize: 22, fontWeight: "700", letterSpacing: 1.5 },
  h2: { fontSize: 14, fontWeight: "700", letterSpacing: 1.3 },
  h3: { fontSize: 12, fontWeight: "600" },
};
