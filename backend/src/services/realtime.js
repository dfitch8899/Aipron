import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";
import { pool } from "../db/connection.js";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Create a Realtime API session
 * Returns ephemeral token and connection details for client WebRTC connection
 * 
 * Note: OpenAI Realtime API uses WebRTC for bidirectional audio streaming.
 * The client connects directly to OpenAI's servers using the session token.
 */
export async function createRealtimeSession(userId) {
  try {
    const sessionId = uuidv4();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Store session metadata in database
    await pool.query(
      `INSERT INTO realtime_sessions (id, user_id, session_id, expires_at)
       VALUES (gen_random_uuid(), $1, $2, $3)`,
      [userId, sessionId, expiresAt]
    );

    // Generate client configuration for Realtime API
    // The client will connect directly to OpenAI using WebRTC
    const clientConfig = {
      model: "gpt-4o-realtime-preview-2024-12-17",
      voice: "alloy",
      instructions: `You are a helpful cooking assistant for AIpron. Guide users through recipes step-by-step.
You can:
- Answer cooking questions
- Explain techniques
- Provide timing guidance
- Suggest substitutions
- Repeat steps when asked

Be concise, clear, and encouraging.`,
      tools: [
        {
          type: "function",
          name: "next_step",
          description: "Move to the next cooking step",
          parameters: {
            type: "object",
            properties: {
              stepNumber: { type: "number" },
            },
            required: ["stepNumber"],
          },
        },
        {
          type: "function",
          name: "repeat_step",
          description: "Repeat the current step instructions",
          parameters: {
            type: "object",
            properties: {
              stepNumber: { type: "number" },
            },
            required: ["stepNumber"],
          },
        },
        {
          type: "function",
          name: "start_timer",
          description: "Start a timer for a cooking step",
          parameters: {
            type: "object",
            properties: {
              duration: { type: "number", description: "Duration in seconds" },
              label: { type: "string" },
            },
            required: ["duration"],
          },
        },
        {
          type: "function",
          name: "ingredient_substitution",
          description: "Get substitution suggestions for an ingredient",
          parameters: {
            type: "object",
            properties: {
              ingredient: { type: "string" },
            },
            required: ["ingredient"],
          },
        },
      ],
    };

    return {
      sessionId,
      expiresAt,
      clientConfig,
      // Client will use OpenAI SDK to establish WebRTC connection
      // with these configuration parameters
    };
  } catch (error) {
    console.error("Realtime session creation error:", error);
    throw new Error("Failed to create realtime session");
  }
}

/**
 * Clean up expired sessions
 */
export async function cleanupExpiredSessions() {
  try {
    await pool.query(
      "DELETE FROM realtime_sessions WHERE expires_at < NOW()"
    );
  } catch (error) {
    console.error("Session cleanup error:", error);
  }
}
