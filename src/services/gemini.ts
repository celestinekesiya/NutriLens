import type { AIResponse } from "../types";
import { buildAnalysisPrompt } from "./prompt";

const API_KEY_STORAGE_KEY = "nutrilens_gemini_api_key";

/* ── API Key resolution: env → localStorage ── */

function getEnvApiKey(): string | null {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  return typeof key === "string" && key.trim() ? key.trim() : null;
}

export function getStoredApiKey(): string | null {
  return getEnvApiKey() ?? localStorage.getItem(API_KEY_STORAGE_KEY);
}

/** Returns true if the key comes from the .env file (not user-provided) */
export function isEnvApiKey(): boolean {
  return getEnvApiKey() !== null;
}

export function storeApiKey(key: string): void {
  try {
    localStorage.setItem(API_KEY_STORAGE_KEY, key);
  } catch (error) {
    console.error("Failed to store API key in localStorage:", error);
  }
}

export function clearApiKey(): void {
  try {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear API key from localStorage:", error);
  }
}

/* ── Convert File → base64 data ── */

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result is "data:<mime>;base64,<data>" — we only need the <data> part
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ── Main analysis call ── */

export async function analyzeImage(
  file: File,
  apiKey: string,
): Promise<AIResponse> {
  const base64Data = await fileToBase64(file);
  const mimeType = file.type || "image/jpeg";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          { text: buildAnalysisPrompt() },
          {
            inline_data: {
              mime_type: mimeType,
              data: base64Data,
            },
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.3,
      topP: 0.8,
      maxOutputTokens: 2048,
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    const errorMsg = `AI API error (${response.status}): ${errBody.slice(0, 200)}`;
    console.error(errorMsg);

    if (response.status === 400) {
      throw new Error("Invalid request — please check your API key and try again.");
    }
    if (response.status === 403) {
      throw new Error("API key is invalid or does not have permission to use AI vision.");
    }
    if (response.status === 429) {
      throw new Error("Rate limit exceeded — please wait a moment and try again.");
    }

    throw new Error(`API error (${response.status}): ${errBody.slice(0, 200)}`);
  }

  const data = await response.json();

  // Extract text from AI response
  const text: string | undefined =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response received from AI. Please try again.");
  }

  // Clean potential markdown fences
  const cleaned = text
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  try {
    const parsed: AIResponse = JSON.parse(cleaned);
    return parsed;
  } catch (parseError) {
    console.error("Failed to parse AI response:", parseError, "Raw response:", cleaned.slice(0, 500));
    throw new Error("AI returned an unexpected response format. Please try again.");
  }
}
