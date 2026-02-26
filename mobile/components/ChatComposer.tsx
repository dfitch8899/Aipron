import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";

interface ChatComposerProps {
  onSend?: (message: string) => void;
}

export function ChatComposer({ onSend }: ChatComposerProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask what you'd like to cook..."
        placeholderTextColor={Colors.textTertiary}
        multiline
      />
      <TouchableOpacity style={styles.sendButton}>
        <Ionicons name="send" size={20} color={Colors.background} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.voiceButton}>
        <Ionicons name="mic" size={20} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
    borderRadius: 22,
    fontSize: 16,
    color: Colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Spacing.md,
  },
  voiceButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: Spacing.sm,
  },
});
