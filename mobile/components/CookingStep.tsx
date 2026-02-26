import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";
import { Typography } from "../constants/Typography";
import { TimerChip } from "./TimerChip";

interface CookingStepProps {
  stepNumber: number;
  instruction: string;
  duration?: number;
  timerRequired?: boolean;
}

export function CookingStep({
  stepNumber,
  instruction,
  duration,
  timerRequired,
}: CookingStepProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepNumber}>Step {stepNumber}</Text>
        {duration && timerRequired && <TimerChip duration={duration} />}
      </View>
      <Text style={styles.instruction}>{instruction}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.xl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  stepNumber: {
    fontSize: Typography.cookingSubtitle,
    fontWeight: Typography.bold,
    color: Colors.cookingText,
    opacity: 0.7,
  },
  instruction: {
    fontSize: Typography.cookingStep,
    fontWeight: Typography.regular,
    color: Colors.cookingText,
    lineHeight: Typography.cookingStep * 1.5,
  },
});
