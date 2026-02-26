import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ChatScreen from "./app/(tabs)/chat";

// Simple entry that renders the Chat UI directly,
// bypassing routing/auth so you can see the interface.
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ChatScreen />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}


