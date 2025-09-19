
import { GoogleGenAI } from "@google/genai";
import type { FileInfo } from '../types';
import type { Part } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const PROMPT_TEMPLATE = `
You are an expert scriptwriter and data storyteller. Your task is to transform the provided information into a compelling and interactive storytelling script.

**Instructions:**
1.  Analyze the content from the provided sources (YouTube link and/or document).
2.  Identify the core topic, key facts, and data points.
3.  Structure the output as a storytelling script, not a summary. Use a narrative style.
4.  The script should be engaging for a general audience. Use clear, concise language.
5.  Explicitly include sections for:
    *   **[SCENE START]**: Describe the visual setting or opening.
    *   **[NARRATOR]**: The main voice-over text.
    *   **[INFOGRAPHIC IDEA]**: Propose a visual infographic to explain a complex point. Describe what it should look like and what data it should show.
    *   **[KEY STATISTIC]**: Highlight a powerful statistic from the content. Present it for maximum impact.
    *   **[INTERACTIVE ELEMENT]**: Suggest a point where the audience could interact (e.g., a poll, a clickable element in a video).
    *   **[SCENE END]**: Conclude a segment.
6.  Ensure the script is factually accurate based on the provided source material.
7.  The final output should be formatted in clean markdown.

**Source Material:**
`;

export const generateScriptFromContent = async (
  youtubeUrl: string,
  fileInfo: FileInfo | null
) => {
  const model = "gemini-2.5-flash";

  const parts: Part[] = [
    { text: PROMPT_TEMPLATE },
  ];

  if (youtubeUrl) {
    parts.push({ text: `YouTube URL: ${youtubeUrl}` });
  }

  if (fileInfo) {
    parts.push({
      inlineData: {
        mimeType: fileInfo.mimeType,
        data: fileInfo.data,
      },
    });
  }

  try {
    const response = await ai.models.generateContentStream({
      model: model,
      contents: { parts: parts },
    });
    return response;
  } catch (error) {
    console.error("Error generating content stream:", error);
    throw new Error("Failed to generate script from Gemini API.");
  }
};
