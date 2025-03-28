import "src/bootstrapping"

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        title: "Blood Donor App",
      }}
    />
  );
}