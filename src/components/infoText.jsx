import React from "react";
import Svg, { Polygon, G, Text, TSpan } from "react-native-svg";
import { Pressable, TouchableOpacity, View} from "react-native";

const InfoText = ({centerX, startY, text}) =>{
    const textLines = text ? getTextLines(text, 30) : [];
    return (<Text
        x={centerX}
        y={startY}
        textAnchor="middle"
        fontWeight={800}
        fontSize={13}
      >
        {textLines.map((line, index) => (
          <TSpan
            key={index}
            x={centerX}
            dy={index === 0 ? 0 : 17}
            textAnchor="middle"
          >
            {line}
          </TSpan>
        ))}
      </Text>)
}
 
const getTextLines = (text, maxChars) => {
    if (!text) return [];
    
    // If text is shorter than max, return as is
    if (text.length <= maxChars) return [text];
    
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';
    
    words.forEach(word => {
      // Check if adding this word would exceed max chars
      if ((currentLine + ' ' + word).trim().length <= maxChars) {
        currentLine = (currentLine + ' ' + word).trim();
      } else {
        // Start a new line if current one is not empty
        if (currentLine.length > 0) {
          lines.push(currentLine);
        }
        // Start new line with current word
        // If word is longer than maxChars, we'll just add it as is
        currentLine = word;
      }
    });
    
    // Add the last line if not empty
    if (currentLine.length > 0) {
      lines.push(currentLine);
    }
    
    return lines;
  };

export default InfoText