import { GoogleGenAI } from "@google/genai";
import { ExecutionResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const compileAndRunCpp = async (code: string): Promise<ExecutionResult> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a standard C++ compiler (g++) execution engine.
      
      Input Code:
      ${code}

      Instructions:
      1. Compile the code.
      2. If there are compilation errors, output ONLY the error messages in standard g++ format (e.g., "main.cpp:5:10: error: ...").
      3. If compilation succeeds, run the code and output ONLY the standard output (stdout).
      4. DO NOT wrap the output in markdown code blocks (like \`\`\`). 
      5. DO NOT add "Output:" or "Result:" prefixes.
      6. DO NOT explain the code.
      
      Strictly return raw text only.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    let text = response.text || "";
    
    // Clean up if the model accidentally adds markdown
    text = text.replace(/^```(cpp|c\+\+|text)?\n/, '').replace(/```$/, '');
    
    // Heuristic to detect error messages common in G++
    const isError = text.toLowerCase().includes(": error:") || text.toLowerCase().includes("fatal error:");

    return {
      output: text.trim(),
      isError: isError
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      output: "g++: fatal error: Failed to connect to compiler service.\ncompilation terminated.",
      isError: true
    };
  }
};