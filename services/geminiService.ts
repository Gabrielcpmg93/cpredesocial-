import { GoogleGenAI } from "@google/genai";

// Helper to initialize the AI client lazily.
// This prevents crashing the app on load if process.env is accessed at the module top-level.
const getAiClient = () => {
  const apiKey = process.env.API_KEY || '';
  return new GoogleGenAI({ apiKey });
};

/**
 * Generates a creative caption based on a short user description or keywords.
 */
export const generateCreativeCaption = async (context: string, mood: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Write a short, engaging, and artistic social media caption based on this context: "${context}". 
      The mood should be ${mood}. Include 3 relevant hashtags. Return only the caption text.`,
    });
    return response.text?.trim() || "Could not generate caption.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error generating caption.";
  }
};

/**
 * Analyzes an image (Base64) and generates a description/caption.
 */
export const analyzeImageAndCaption = async (base64Image: string): Promise<string> => {
  try {
    const ai = getAiClient();
    // Remove data URL prefix if present for the API call
    const base64Data = base64Image.split(',')[1]; 

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg for simplicity, or detect from string
              data: base64Data
            }
          },
          {
            text: "Describe this image artistically for a social media post. Keep it under 50 words. Add hashtags."
          }
        ]
      }
    });
    return response.text?.trim() || "Could not analyze image.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Error analyzing image.";
  }
};