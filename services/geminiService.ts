
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { CaseAnalysis } from "../types";

// Vite uses import.meta.env to access environment variables
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";

export async function analyzeLegalCase(caseText: string): Promise<CaseAnalysis> {
  if (!apiKey || apiKey === "undefined") {
    throw new Error("API Key is missing. Please ensure VITE_GEMINI_API_KEY is set in your .env.local file and RESTART your terminal.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  
  // Updated list to include Gemini 3 and 2.5 series for future/experimental compatibility
  const modelsToTry = [
    "gemini-3-flash-preview", 
    "gemini-2.5-flash-preview", 
    "gemini-2.0-flash", 
    "gemini-1.5-flash"
  ];
  
  let lastError: any = null;

  const generationConfig = {
    responseMimeType: "application/json",
    responseSchema: {
      type: SchemaType.OBJECT,
      properties: {
        ipc_sections: {
          type: SchemaType.ARRAY,
          items: {
            type: SchemaType.OBJECT,
            properties: {
              section: { type: SchemaType.STRING },
              title: { type: SchemaType.STRING },
              description: { type: SchemaType.STRING },
              bailable: { type: SchemaType.STRING },
              compoundable: { type: SchemaType.STRING }
            },
            required: ["section", "title", "description", "bailable", "compoundable"]
          }
        },
        predicted_verdict: { type: SchemaType.STRING },
        punishment: { type: SchemaType.STRING },
        summary: { type: SchemaType.STRING },
        precedents: {
          type: SchemaType.ARRAY,
          items: { type: SchemaType.STRING }
        }
      },
      required: ["ipc_sections", "predicted_verdict", "punishment", "summary", "precedents"]
    }
  };

  for (const modelName of modelsToTry) {
    try {
      console.log(`Attempting analysis with ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName, generationConfig });
      
      const prompt = `Analyze the following Indian criminal case and provide a structured legal opinion.
      
      Case Description:
      ${caseText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const rawData = JSON.parse(response.text());
      
      return {
        ...rawData,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        inputText: caseText
      };
    } catch (error: any) {
      lastError = error;
      console.warn(`${modelName} failed:`, error.message);
      
      // If the error is "not found", continue to next model.
      // If it's a quota error (429), we also try the next model as quotas are often per-model.
      if (error.message?.includes("404") || error.message?.includes("not found") || error.message?.includes("429")) {
        continue;
      }
      // For other critical errors (auth, etc.), break and show the error.
      break;
    }
  }

  // Final error handling if all attempts failed
  if (lastError?.message?.includes("429")) {
    throw new Error("Rate limit reached across all models. Please wait a minute before trying again.");
  }
  
  throw new Error(`Analysis failed. The selected models (including 3 and 2.5 series) might not be available for your API key yet. Details: ${lastError?.message}`);
}
