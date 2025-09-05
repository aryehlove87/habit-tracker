import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { supabase } from "../src/supabase";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Auto-redirect if already signed in
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        router.replace("/today");
      }
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        router.replace("/today");
      }
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    }
  }

  return (
    <View style={{ padding: 24, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Sign in</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputMode="email"
        style={{ borderWidth: 1, padding: 8 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 8 }}
      />

      <Button title="Sign in" onPress={handleSignIn} />

      <Button
        title="Create account"
        onPress={() => router.push("/signup")}
      />
    </View>
  );
}
