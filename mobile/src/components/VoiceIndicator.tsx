import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors, spacing, borderRadius, typography } from "../constants/DesignTokens";

interface VoiceIndicatorProps {
  isListening: boolean;
  isSpeaking: boolean;
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
}

export const VoiceIndicator: React.FC<VoiceIndicatorProps> = ({
  isListening,
  isSpeaking,
  loading = false,
  error = false,
  disabled = false,
}) => {
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (isListening || isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isListening, isSpeaking, pulseAnim]);

  if (error) {
    return (
      <View style={styles.container}>
        <View style={[styles.indicator, styles.indicatorError]} />
        <Text style={styles.label}>Error</Text>
      </View>
    );
  }

  if (disabled || loading) {
    return (
      <View style={styles.container}>
        <View style={[styles.indicator, styles.indicatorDisabled]} />
        <Text style={styles.label}>
          {loading ? "Connecting..." : "Disabled"}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.indicator,
          isListening && styles.indicatorListening,
          isSpeaking && styles.indicatorSpeaking,
          { transform: [{ scale: pulseAnim }] },
        ]}
      />
      <Text style={styles.label}>
        {isListening ? "Listening..." : isSpeaking ? "Speaking..." : "Ready"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.md,
  },
  indicator: {
    width: 16,
    height: 16,
    borderRadius: borderRadius.full,
    backgroundColor: colors.textDisabled,
    marginBottom: spacing.xs,
  },
  indicatorListening: {
    backgroundColor: colors.info,
  },
  indicatorSpeaking: {
    backgroundColor: colors.primary,
  },
  indicatorDisabled: {
    backgroundColor: colors.textDisabled,
  },
  indicatorError: {
    backgroundColor: colors.error,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
});
