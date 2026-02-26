import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing, borderRadius, typography } from "../constants/DesignTokens";
import { VoiceButton } from "./VoiceButton";

interface ChatComposerProps {
  onSend: (message: string) => void;
  onVoicePress?: () => void;
  isRecording?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export const ChatComposer: React.FC<ChatComposerProps> = ({
  onSend,
  onVoicePress,
  isRecording = false,
  isLoading = false,
  placeholder = "What would you like to cook?",
  disabled = false,
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {onVoicePress && (
          <VoiceButton
            onPress={onVoicePress}
            isRecording={isRecording}
            disabled={disabled || isLoading}
          />
        )}
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          multiline
          editable={!disabled && !isLoading}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />
        {message.trim() && (
          <TouchableOpacity
            style={[styles.sendButton, (disabled || isLoading) && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={disabled || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color={colors.background} size="small" />
            ) : (
              <Ionicons name="send" size={20} color={colors.background} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    ...typography.body,
    color: colors.text,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.textDisabled,
  },
});
