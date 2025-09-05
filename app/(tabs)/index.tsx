import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Hello Aryeh 🚀
      </Text>
      <Text>My habit tracker is online!</Text>
      <Button title="Go to Today" onPress={() => router.push("/today")} />
    </View>
  );
}
