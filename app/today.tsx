import { router } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Today() {
  return (
    <View style={{ padding: 24, gap: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "700" }}>Today</Text>
      <Text>Stub page — habits and logging go here.</Text>
      <Button title="Back home" onPress={() => router.replace("/")} />
    </View>
  );
}
