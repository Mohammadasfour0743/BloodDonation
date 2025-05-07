import React from "react";
import { View, Dimensions, ScrollView } from "react-native";
import Hexagon from "./hexagon"; // The updated one with text inside

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const HexGrid = ({ size = 40 }) => {
  const hexHeight = Math.sqrt(3) * size;
  const hexWidth = 2 * size;

  const verticalSpacing = hexHeight * 0.75; // because hexes overlap
  const horizontalSpacing = hexWidth;

  const cols = Math.ceil(screenWidth / hexWidth) + 1;
  const rows = Math.ceil(screenHeight / verticalSpacing) + 1;

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <View
          key={rowIndex}
          style={{
            flexDirection: "row",
            marginLeft: rowIndex % 2 === 0 ? 0 : size, // offset every other row
          }}
        >
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Hexagon
              key={colIndex}
              size={size}
              label={`${rowIndex},${colIndex}`} // You can replace with custom content
            />
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default HexGrid;