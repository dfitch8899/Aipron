/**
 * Typography tokens
 * Cooking Mode: max 3 text sizes, minimum 24px for active step text
 */

export const Typography = {
  // Standard sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 32,

  // Cooking mode sizes (3 sizes max)
  cookingStep: 24, // Minimum per PRD
  cookingTitle: 32,
  cookingSubtitle: 18,

  // Weights
  regular: "400" as const,
  medium: "500" as const,
  semibold: "600" as const,
  bold: "700" as const,
};
