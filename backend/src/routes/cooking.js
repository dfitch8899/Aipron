import express from "express";
import { body, validationResult } from "express-validator";
import { authenticateToken } from "../middleware/auth.js";
import { pool } from "../db/connection.js";

export const cookingRouter = express.Router();

// Start cooking session
cookingRouter.post(
  "/sessions",
  authenticateToken,
  [body("recipeId").isUUID()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { recipeId } = req.body;

      // Verify recipe exists
      const recipeResult = await pool.query(
        "SELECT id FROM recipes WHERE id = $1",
        [recipeId]
      );

      if (recipeResult.rows.length === 0) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      // Create cooking session
      const result = await pool.query(
        `INSERT INTO cooking_sessions (user_id, recipe_id, current_step)
         VALUES ($1, $2, 1)
         RETURNING *`,
        [req.user.id, recipeId]
      );

      res.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Get active cooking session
cookingRouter.get("/sessions/active", authenticateToken, async (req, res, next) => {
  try {
    const result = await pool.query(
      `SELECT cs.*, r.title, r.steps, r.ingredients
       FROM cooking_sessions cs
       JOIN recipes r ON cs.recipe_id = r.id
       WHERE cs.user_id = $1 AND cs.completed_at IS NULL
       ORDER BY cs.started_at DESC
       LIMIT 1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No active session" });
    }

    const session = result.rows[0];
    res.json({
      ...session,
      steps: session.steps,
      ingredients: session.ingredients,
    });
  } catch (error) {
    next(error);
  }
});

// Update cooking session step
cookingRouter.patch(
  "/sessions/:id/step",
  authenticateToken,
  [body("stepNumber").isInt({ min: 1 })],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id } = req.params;
      const { stepNumber } = req.body;

      const result = await pool.query(
        `UPDATE cooking_sessions
         SET current_step = $1, updated_at = NOW()
         WHERE id = $2 AND user_id = $3
         RETURNING *`,
        [stepNumber, id, req.user.id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Session not found" });
      }

      res.json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  }
);

// Complete cooking session
cookingRouter.post("/sessions/:id/complete", authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE cooking_sessions
       SET completed_at = NOW(), updated_at = NOW()
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});
