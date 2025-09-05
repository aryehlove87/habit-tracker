import { router } from "expo-router";
import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { supabase } from "../src/supabase";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zip, setZip] = useState("");
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      alert(error.message);
    } else {
      // Try to update profile (trigger should also auto-create it)
      const { data: ures } = await supabase.auth.getUser();
      const uid = ures.user?.id;
      if (uid) {
        await supabase.from("profiles").update({
          zip_code: zip || null,
          birthday: birthday || null,
        }).eq("id", uid);
      }
      router.replace("/today");
    }
    setLoading(false);
  }

  return (
    <View style={{ padding: 24, gap: 10 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Create account</Text>
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
      <TextInput
        placeholder="ZIP code (optional)"
        value={zip}
        onChangeText={setZip}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Birthday (YYYY-MM-DD)"
        value={birthday}
        onChangeText={setBirthday}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button title={loading ? "Creating…" : "Sign up"} onPress={handleSignUp} />
      <Button title="Back to sign in" onPress={() => router.replace("/")} />
    </View>
  );
}
