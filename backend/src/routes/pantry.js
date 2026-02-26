import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import { findPantryRecipes } from "../services/openai.js";
import { pool } from "../db/connection.js";

export const pantryRouter = express.Router();

// Get pantry items
pantryRouter.get("/", authenticateToken, async (req, res, next) => {
  try {
    const result = await pool.query(
      "SELECT * FROM pantry_items WHERE user_id = $1 ORDER BY name",
      [req.user.id]
    );
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
});

// Add pantry item
pantryRouter.post(
  "/",
  authenticateToken,
  [
    body("name").notEmpty().trim(),
    body("quantity").optional().isFloat({ min: 0 }),
    body("unit").optional().trim(),
  ],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, quantity, unit, expiresAt } = req.body;

      const result = await pool.query(
        `INSERT INTO pantry_items (user_id, name, quantity, unit, expires_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (user_id, name) 
         DO UPDATE SET quantity = $3, unit = $4, expires_at = $5, updated_at = NOW()
         RETURNING *`,
        [req.user.id, name, quantity, unit, expiresAt]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Delete pantry item
pantryRouter.delete("/:id", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.query(
      "DELETE FROM pantry_items WHERE id = $1 AND user_id = $2",
      [id, req.user.id]
    );
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// Find recipes from pantry
pantryRouter.post(
  "/recipes",
  authenticateToken,
  [body("dietaryFilters").optional().isArray()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Get user's pantry items
      const pantryResult = await pool.query(
        "SELECT name FROM pantry_items WHERE user_id = $1",
        [req.user.id]
      );

      const ingredients = pantryResult.rows.map((r) => r.name);
      const { dietaryFilters = [] } = req.body;

      if (ingredients.length === 0) {
        return res.json([]);
      }

      const recipes = await findPantryRecipes(ingredients, dietaryFilters, 5);

      res.json(recipes);
    } catch (error) {
      next(error);
    }
  }
);
