import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import { generateRecipe, getSubstitutions } from "../services/openai.js";
import { pool } from "../db/connection.js";

export const recipesRouter = express.Router();

// Generate recipe
recipesRouter.post(
  "/generate",
  authenticateToken,
  [
    body("prompt").notEmpty().trim(),
    body("dietaryFilters").optional().isArray(),
    body("servings").optional().isInt({ min: 1, max: 12 }),
    body("skillLevel").optional().isIn(["beginner", "intermediate", "advanced"]),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { prompt, dietaryFilters = [], servings = 4, skillLevel = "intermediate" } = req.body;

      const recipe = await generateRecipe(prompt, {
        dietaryFilters,
        servings,
        skillLevel,
      });

      // Save recipe to database
      const result = await pool.query(
        `INSERT INTO recipes (
          user_id, title, description, ingredients, steps,
          prep_time, cook_time, total_time, servings, nutrition,
          dietary_tags, cuisine, difficulty
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        RETURNING id, created_at`,
        [
          req.user.id,
          recipe.title,
          recipe.description,
          JSON.stringify(recipe.ingredients),
          JSON.stringify(recipe.steps),
          recipe.prepTime,
          recipe.cookTime,
          recipe.totalTime,
          recipe.servings,
          JSON.stringify(recipe.nutrition),
          recipe.dietaryTags,
          recipe.cuisine,
          recipe.difficulty,
        ]
      );

      res.json({
        ...recipe,
        id: result.rows[0].id,
        createdAt: result.rows[0].created_at,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get recipe by ID
recipesRouter.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM recipes WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipe = result.rows[0];
    res.json({
      ...recipe,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      nutrition: recipe.nutrition,
    });
  } catch (error) {
    next(error);
  }
});

// Get user's recipes
recipesRouter.get("/", authenticateToken, async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM recipes WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user.id]
    );

    res.json(result.rows.map((r) => ({
      ...r,
      ingredients: r.ingredients,
      steps: r.steps,
      nutrition: r.nutrition,
    })));
  } catch (error) {
    next(error);
  }
});

// Scale recipe
recipesRouter.post(
  "/:id/scale",
  authenticateToken,
  [body("servings").isInt({ min: 1, max: 12 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { servings } = req.body;

      const result = await pool.query(
        "SELECT * FROM recipes WHERE id = $1 AND user_id = $2",
        [id, req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      const recipe = result.rows[0];
      const originalServings = recipe.servings;
      const scaleFactor = servings / originalServings;

      // Scale ingredients
      const scaledIngredients = recipe.ingredients.map((ing) => ({
        ...ing,
        quantity: Math.round(ing.quantity * scaleFactor * 100) / 100,
      }));

      // Scale nutrition
      const scaledNutrition = recipe.nutrition
        ? Object.fromEntries(
            Object.entries(recipe.nutrition).map(([key, value]) => [
              key,
              value ? Math.round(value * scaleFactor) : null,
            ])
          )
        : null;

      res.json({
        ...recipe,
        servings,
        ingredients: scaledIngredients,
        nutrition: scaledNutrition,
      });
    } catch (error) {
      next(error);
    }
  }
);

// Get ingredient substitutions
recipesRouter.post(
  "/substitutions",
  authenticateToken,
  [body("ingredient").notEmpty()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { ingredient, dietaryFilters = [] } = req.body;
      const substitutions = await getSubstitutions(ingredient, dietaryFilters);

      res.json({ ingredient, substitutions });
    } catch (error) {
      next(error);
    }
  }
);
