import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, borderRadius, typography } from "../constants/DesignTokens";

interface TimerChipProps {
  duration: number; // seconds
  isActive?: boolean;
  onComplete?: () => void;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const TimerChip: React.FC<TimerChipProps> = ({
  duration,
  isActive = false,
  onComplete,
  loading = false,
  error = false,
  disabled = false,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isActive && isRunning && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isActive, isRunning, timeRemaining, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleToggle = () => {
    if (!disabled && !loading) {
      setIsRunning(!isRunning);
    }
  };

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Timer error</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isRunning && styles.containerRunning,
        disabled && styles.containerDisabled,
      ]}
      onPress={handleToggle}
      disabled={disabled || loading}
    >
      <Text style={[styles.time, isRunning && styles.timeRunning]}>
        {loading ? "..." : formatTime(timeRemaining)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.border,
  },
  containerRunning: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight + "20",
  },
  containerDisabled: {
    opacity: 0.5,
  },
  time: {
    ...typography.cooking.timer,
    fontSize: 20,
    color: colors.cookingTextSecondary,
  },
  timeRunning: {
    color: colors.primary,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
});
