import { View, StyleSheet, Animated } from "react-native";
import { Colors } from "../constants/Colors";
import { useEffect, useRef } from "react";

interface VoiceIndicatorProps {
  isActive: boolean;
  isListening: boolean;
}

export function VoiceIndicator({ isActive, isListening }: VoiceIndicatorProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isListening) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      scaleAnim.setValue(1);
    }
  }, [isListening, scaleAnim]);

  if (!isActive) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ scale: scaleAnim }] }]}>
      <View style={styles.indicator} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.background,
  },
});
