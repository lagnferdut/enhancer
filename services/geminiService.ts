import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { API_KEY, GEMINI_MODEL_TEXT } from '../constants';

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
  if (!API_KEY) {
    throw new Error("API key is not available. Please set the API_KEY environment variable.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
};

export const callGeminiApi = async (prompt: string): Promise<string> => {
  try {
    const client = getAiClient();
    const response: GenerateContentResponse = await client.models.generateContent({
      model: GEMINI_MODEL_TEXT,
      contents: prompt,
      // Not using thinkingConfig here for general text enhancement.
      // config: {
      //   temperature: 0.7, // Example, adjust as needed
      //   topK: 40,
      //   topP: 0.95,
      // }
    });
    
    // Direct access to text as per guidelines
    const text = response.text;
    if (typeof text !== 'string') {
        console.error("Unexpected response format from Gemini API:", response);
        throw new Error("Received non-text response from Gemini API.");
    }
    return text.trim();

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific API key related errors if possible from error structure
        if (error.message.includes("API key not valid") || error.message.includes("invalid api key")) {
             throw new Error("API key not valid. Please check your API key.");
        }
    }
    throw error; // Re-throw the error to be handled by the caller
  }
};