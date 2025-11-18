
import { GoogleGenAI, Type } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";
import type { Language, WasteClassification, WasteCategory } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getLanguageName = (langCode: Language): string => {
    switch (langCode) {
        case 'en': return 'English';
        case 'fr': return 'French';
        case 'pi': return 'Cameroonian Pidgin English';
        default: return 'English';
    }
}

const model = 'gemini-2.5-flash';

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        wasteType: { 
            type: Type.STRING,
            description: "The identified type of waste. Must be one of: 'Plastic', 'Metal', 'Paper', 'Organic', 'Glass', 'Other', or 'Uncertain' if it cannot be identified.",
        },
        sortingInstruction: { 
            type: Type.STRING,
            description: "A short, clear instruction on how to sort this waste item.",
        },
        educationalTip: {
            type: Type.STRING,
            description: "A brief, helpful educational tip related to recycling or waste management for this item.",
        },
    },
    required: ["wasteType", "sortingInstruction", "educationalTip"],
};


export const classifyWaste = async (imageFile: File, language: Language): Promise<WasteClassification> => {
    const base64Image = await fileToBase64(imageFile);
    const languageName = getLanguageName(language);
    
    const systemInstruction = `You are an AI assistant for the Smart Waste Classification System in Cameroon.
Your task is to identify the primary waste item in the user's image and provide sorting instructions and an educational tip.
The images are from Cameroon and may have backgrounds with red dirt, be low-resolution, or have poor lighting. The common waste types are plastics (bottles, bags), metals (cans, scrap), paper/cardboard, organic (food scraps), and glass.
The user has requested the response in ${languageName}. All text in your JSON response must be in this language.
You MUST respond with a valid JSON object that adheres to the provided schema. If you cannot confidently identify the waste, set wasteType to 'Uncertain'.`;

    const textPart = {
        text: `Classify the waste in this image and provide the response in ${languageName}.`
    };

    const imagePart = {
        inlineData: {
            mimeType: imageFile.type,
            data: base64Image,
        },
    };

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [textPart, imagePart] },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.2,
            }
        });

        const jsonString = response.text;
        const result = JSON.parse(jsonString);

        // Validate the wasteType field
        const validWasteTypes: WasteCategory[] = ['Plastic', 'Metal', 'Paper', 'Organic', 'Glass', 'Other', 'Uncertain'];
        if (!validWasteTypes.includes(result.wasteType)) {
            console.warn(`Unexpected wasteType from API: ${result.wasteType}. Defaulting to 'Other'.`);
            result.wasteType = 'Other';
        }

        return result as WasteClassification;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to get a valid response from the AI model.");
    }
};
