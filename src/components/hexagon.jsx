import React from "react";
import Svg, { Polygon, G, Text } from "react-native-svg";
import { Pressable, TouchableOpacity, View} from "react-native";
import Hemoglobin from "./hemoglobin";
import Smoking from "./smoking";
import Dental from "./tooth";
import Tattoo from "./tatoo";
import Travel from "./travel";
import Viruses from "./viruses";
import Weight from "./weight";
import Health from "./health";
import Surgery from "./surgery";
import Pregnancy from "./pregnancy";
import Age from "./age";
import Diabetes from "./diabetes";
import Antibiotics from "./antibiotics";
import Pressure from "./pressure";
import Cholestorol from "./cholestorol";
import Allergies from "./allergies";
import Vaccines from "./vaccines";
import InfoText from "./infoText";
import Temperature from "./temperature";

const Hexagon = ({ name, size, style, open, color, text1 }) => {
  const height = Math.sqrt(3) * size;
  const randcolor = chooseColor(); // just the color string now
  const points = `
    ${size / 2},0 
    ${1.5 * size},0 
    ${2 * size},${height / 2} 
    ${1.5 * size},${height} 
    ${size / 2},${height} 
    0,${height / 2}
  `;

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, width: 2 * size, height, ...style }}>
      <TouchableOpacity disabled = {name == null || name == undefined} onPress={open}>
      <Svg height={height} width={2 * size}>
        <Polygon points={points} fill={color??randcolor} />
        <Text fontWeight={700} fill="#780000" fontSize={12} x = {74} y = {30} textAnchor= "middle">{name?.toUpperCase()}</Text>
        <G x = {38} y = {50} >{React.cloneElement(getIcon(name, text1))}</G>
      </Svg>
      </TouchableOpacity>
    </View>
  );
  
};

export default Hexagon;

const dictionary = {
  "Age": "You can donate if you are between 18 and 60 years old.",
  "Smoking": "Smoking does not affect blood donation. You can still donate.",
  "Hemoglobin": "Hemoglobin level should be above 13 for women, and above 13.5 for men.",
  "Tattoo": "12 months waiting period.",
  "Health": "You cannot donate if you have ongoing liver, lung or heart conditions",
  "Weight": "Women above 50 kg can donate. Men above 60 kg can donate.",
  "Dental": "Can donate if no surgery and/or anesthesia was applied.",
  "Surgery": "12 months waiting period after surgery.",
  "Allergies": "You can donate if you are feeling well. 14 days waiting period if the symptoms are severe.",
  "Viruses":"It depends on each virus. Waiting period for Covid-19 is 1-3 months.",
  "Vaccines": "Waiting period between 1 and 3 months depending on the vaccine.",
  "Cholestorol": "Can donate if regulated depending on hospital.",
  "Pregnancy": "Cannot donate if pregnant or breastfeeding (12 months waiting period postpartum).",
  "Diabetes": "Cannot donate if taking insulin injections.",
  "Pressure": "Can donate if regulated, no signs of hypertension.",
  "Travel": "You cannot donate if you traveled to an endemic country for malaria.",
  "Temperature": "To donate, your body temperature should not exceed 36-37°C.",
  "Antibiotics":"Waiting period 14 days after completion of treatment."
}

function chooseColor() {
  const colors = [
    "#EBD9D9",
    "#E5CCCC",
    "#E1B7B7",
    "#D3AAAA"
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
}

function getIcon(name, text1){
  switch(name){
      case "Hemoglobin": 
        return <Hemoglobin width = {70} height = {70} />;
      case "Smoking":
        return <Smoking width = {70} height = {70} />;
      case "Dental":
        return <Dental width = {70} height = {70} />;
      case "Tattoo":
        return <Tattoo width = {70} height = {70} />;
      case "Travel":
        return <Travel width = {65} height = {65} />;
      case "Viruses":
        return <Viruses width = {70} height = {70} />;
      case "Weight":
        return <Weight width = {68} height = {68} />;
      case "Health":
        return <Health width = {77} height = {77} />;
      case "Surgery":
        return <Surgery width = {77} height = {77} />;
      case "Pregnancy":
        return <Pregnancy width = {80} height = {80} />;
      case "Age":
        return <Age width = {80} height = {80} />;
      case "Diabetes":
        return <Diabetes width = {77} height = {77} />;
      case "Cholestorol":
        return <Cholestorol width = {80} height = {80} />;
      case "Antibiotics":
        return <Antibiotics width = {70} height = {70} />; 
      case "Allergies":
        return <Allergies width = {70} height = {70} />;
      case "Pressure":
        return <Pressure width = {70} height = {70} />;
      case "Vaccines":
        return <Vaccines width = {70} height = {70} />;
      case "Temperature":
        return <Temperature width = {70} height = {70} />;
      default:
        return <InfoText startY = {70} centerX = {105} text = {dictionary[text1] ?? "wroefai"} />;
    }
}