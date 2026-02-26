import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ingredient } from "@aipron/shared";
import { colors, spacing, typography } from "../constants/DesignTokens";

interface IngredientRowProps {
  ingredient: Ingredient;
  onPress?: () => void;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
  showSubstitution?: boolean;
}

export const IngredientRow: React.FC<IngredientRowProps> = ({
  ingredient,
  onPress,
  loading = false,
  error = false,
  disabled = false,
  showSubstitution = false,
}) => {
  const content = (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text
          style={[
            styles.name,
            disabled && styles.nameDisabled,
            error && styles.nameError,
          ]}
        >
          {ingredient.name}
        </Text>
        <Text style={styles.quantity}>
          {ingredient.quantity} {ingredient.unit}
        </Text>
      </View>
      {ingredient.notes && (
        <Text style={styles.notes}>{ingredient.notes}</Text>
      )}
      {showSubstitution && (
        <TouchableOpacity style={styles.substitutionButton}>
          <Text style={styles.substitutionText}>Find substitution</Text>
        </TouchableOpacity>
      )}
      {loading && (
        <View style={styles.loadingOverlay}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return content;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    ...typography.body,
    color: colors.text,
    flex: 1,
  },
  nameDisabled: {
    opacity: 0.5,
  },
  nameError: {
    color: colors.error,
  },
  quantity: {
    ...typography.body,
    color: colors.textSecondary,
    marginLeft: spacing.md,
  },
  notes: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontStyle: "italic",
  },
  substitutionButton: {
    marginTop: spacing.xs,
    paddingVertical: spacing.xs,
  },
  substitutionText: {
    ...typography.caption,
    color: colors.primary,
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
