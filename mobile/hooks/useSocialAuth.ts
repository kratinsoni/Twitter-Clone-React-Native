import * as Linking from "expo-linking";
import { useSSO } from "@clerk/clerk-expo";
import { useState } from "react";
import { Alert } from "react-native";

export const useSocialAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { startSSOFlow } = useSSO();

  const handleSocialAuth = async (strategy: "oauth_google" | "oauth_apple") => {
    setIsLoading(true);
    try {
      const redirectUrl = Linking.createURL("/(auth)/sso-callback");

      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl, // ✅ IMPORTANT
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.log("Social Auth Error:", err);
      const provider = strategy === "oauth_google" ? "Google" : "Apple";
      Alert.alert(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleSocialAuth };
};
