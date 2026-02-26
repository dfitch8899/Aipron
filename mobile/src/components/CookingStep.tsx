import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RecipeStep } from "@aipron/shared";
import { colors, spacing, typography } from "../constants/DesignTokens";
import { TimerChip } from "./TimerChip";

interface CookingStepProps {
  step: RecipeStep;
  isActive: boolean;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const CookingStep: React.FC<CookingStepProps> = ({
  step,
  isActive,
  loading = false,
  error = false,
  disabled = false,
}) => {
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load step</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, isActive && styles.activeContainer]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.stepNumber, isActive && styles.stepNumberActive]}>
          Step {step.stepNumber}
        </Text>
        {step.timerRequired && step.duration && (
          <TimerChip duration={step.duration} isActive={isActive} />
        )}
      </View>
      <Text
        style={[
          styles.instruction,
          isActive && styles.instructionActive,
          disabled && styles.instructionDisabled,
        ]}
      >
        {step.instruction}
      </Text>
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.cookingBackground,
  },
  activeContainer: {
    backgroundColor: colors.cookingBackground,
  },
  content: {
    padding: spacing.xl,
    paddingTop: spacing.xxl,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  stepNumber: {
    ...typography.cooking.step,
    color: colors.cookingTextSecondary,
  },
  stepNumberActive: {
    color: colors.cookingText,
  },
  instruction: {
    ...typography.cooking.instruction,
    color: colors.cookingTextSecondary,
    lineHeight: 32,
  },
  instructionActive: {
    color: colors.cookingText,
  },
  instructionDisabled: {
    opacity: 0.5,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(26, 26, 26, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    ...typography.body,
    color: colors.cookingText,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: "center",
    padding: spacing.xl,
  },
});
