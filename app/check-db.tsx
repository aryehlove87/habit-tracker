import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { supabase } from "../src/supabase";

export default function CheckDb() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) {
        setErrorMsg(error.message);
      } else {
        setProfiles(data || []);
      }
    })();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, fontWeight: "700" }}>Profiles</Text>
      {errorMsg && <Text style={{ color: "red" }}>{errorMsg}</Text>}
      {profiles.length === 0 ? (
        <Text>No rows yet</Text>
      ) : (
        profiles.map((p) => <Text key={p.id}>{p.id}</Text>)
      )}
    </View>
  );
}
