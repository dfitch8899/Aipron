import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";
import { Spacing } from "../constants/Spacing";

interface IngredientRowProps {
  name: string;
  quantity: number;
  unit: string;
  notes?: string;
}

export function IngredientRow({ name, quantity, unit, notes }: IngredientRowProps) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        {notes && <Text style={styles.notes}>{notes}</Text>}
      </View>
      <Text style={styles.quantity}>
        {quantity} {unit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.text,
  },
  notes: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  quantity: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
