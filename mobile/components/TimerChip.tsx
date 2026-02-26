import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";

interface TimerChipProps {
  duration: number; // seconds
  label?: string;
}

export function TimerChip({ duration, label }: TimerChipProps) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  const displayTime = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label || displayTime}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.cookingAccent,
    borderRadius: 16,
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.cookingText,
  },
});
