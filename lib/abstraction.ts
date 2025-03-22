import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import groq from './groq-client';

const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY';
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.3,
    topP: 0.95,
    maxOutputTokens: 4096,
  },
  safetySettings: [
    { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
    { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE }
  ]
});

/**
 * Recursively converts any JSON object or array into a formatted text string.
 * This approach does not depend on hardcoded section names.
 *
 * @param {any} json - The JSON data to convert.
 * @param {number} indent - The current indentation level (used internally).
 * @returns {string} The formatted text representation.
 */
function convertJsonToText(json: any, indent = 0) {
  const indentation = "  ".repeat(indent);
  let text = "";

  if (json === null) {
    return "null";
  } else if (typeof json === "object" && !Array.isArray(json)) {
    // Process object keys
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const value = json[key];
        if (typeof value === "object") {
          text += `${indentation}${key}:\n${convertJsonToText(value, indent + 1)}`;
        } else {
          text += `${indentation}${key}: ${value}\n`;
        }
      }
    }
  } else if (Array.isArray(json)) {
    // Process array items
    json.forEach((item) => {
      if (typeof item === "object") {
        text += `${indentation}-\n${convertJsonToText(item, indent + 1)}`;
      } else {
        text += `${indentation}- ${item}\n`;
      }
    });
  } else {
    text += indentation + json + "\n";
  }
  return text;
}

/**
 * Helper function to parse the Gemini API response.
 * Cleans and parses the JSON response text.
 *
 * @param {Promise<any>} response - The API response promise.
 * @returns {Object} The parsed JSON response.
 */
interface ParsedResponse {
  [key: string]: any;
  ats_score?: number;
  score_breakdown?: {
    keyword_match?: number;
    experience_match?: number;
    skill_match?: number;
    education_match?: number;
  };
  missing_keywords?: string[];
  strengths?: string[];
  weaknesses?: string[];
  recommendations?: string[];
  fallback_data?: {
    ats_score?: number;
    strengths?: string[];
    weaknesses?: string[];
    recommendations?: string[];
  };
}

interface ParseError {
  error: string;
  details?: string;
}

async function parseResponse(responseText: string): Promise<ParsedResponse | ParseError> {
    try {
        // First, log the raw response for debugging
        console.log("Raw response from Gemini (first 200 chars):", responseText.substring(0, 200));
        
        // Check if it starts with any non-JSON characters
        const firstChar = responseText.trim()[0];
        console.log("First character of response:", firstChar);
        if (firstChar !== '{' && firstChar !== '[') {
            console.log("Response doesn't start with { or [, might not be JSON");
        }

        // Try to find JSON content with improved regex pattern
        const jsonPattern = /(\{(?:[^{}]|(\{(?:[^{}]|(\{[^{}]*\}))*\}))*\})/g;
        const matches = responseText.match(jsonPattern);
        
        if (!matches || matches.length === 0) {
            console.error("No JSON object found in response");
            
            // Fallback: Return a structured response with the raw text
            return {
                error: "Failed to parse JSON from AI response",
                raw_response: responseText,
                fallback_data: {
                    // Try to extract some useful info even if JSON parsing fails
                    ats_score: extractNumberAfterPattern(responseText, /score:?\s*(\d+)/i) || 70,
                    strengths: extractListItems(responseText, "strength"),
                    weaknesses: extractListItems(responseText, "weakness|improvement"),
                    recommendations: extractListItems(responseText, "recommend|suggest")
                }
            };
        }
        
        // Try each potential JSON match
        for (const potentialJson of matches) {
            try {
                // Clean up the JSON string
                const cleaned = potentialJson
                    .replace(/```json/g, '')
                    .replace(/```/g, '')
                    .trim();
                
                return JSON.parse(cleaned);
            } catch (err) {
                console.log("Failed to parse potential JSON match:", potentialJson);
                // Continue to the next match
            }
        }
        
        // If we get here, none of the matches were valid JSON
        throw new Error("Found potential JSON structures but none were valid");
        
    } catch (error) {
        console.error("JSON parse error details:", error);
        
        // Create a fallback response with some default values
        return { 
            error: "Failed to parse JSON response", 
            details: (error as Error).message,
            ats_score: 75,
            strengths: ["Experience in relevant field", "Technical skills match"],
            weaknesses: ["Resume could be more tailored to the job"],
            recommendations: ["Add more keywords from the job description"]
        };
    }
}

// Helper function to extract numbers after patterns like "score: 85"
function extractNumberAfterPattern(text: string, pattern: RegExp): number | null {
    const match = text.match(pattern);
    if (match && match[1]) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num)) return num;
    }
    return null;
}

// Helper function to extract bullet points or list items
function extractListItems(text: string, keyword: string): string[] {
    const items: string[] = [];
    
    // Look for list patterns (- item, • item, 1. item, etc.)
    const listPattern = new RegExp(`([-•*]|\\d+\\.?)\\s+([^\\n]+${keyword}[^\\n]+)`, 'gi');
    let match;
    
    while ((match = listPattern.exec(text)) !== null) {
        if (match[2]) items.push(match[2].trim());
    }
    
    // If no items found, try to extract sentences containing the keyword
    if (items.length === 0) {
        const sentencePattern = new RegExp(`[^.!?]*${keyword}[^.!?]*[.!?]`, 'gi');
        while ((match = sentencePattern.exec(text)) !== null) {
            items.push(match[0].trim());
        }
    }
    
    // Return items, or default items if none found
    return items.length > 0 ? items : [
        `Consider improving your ${keyword.split('|')[0]} areas`,
        `Work on enhancing ${keyword.split('|')[0]} in your resume`
    ];
}

// Helper function to parse JSON responses
async function parseJSON(text: string): Promise<any> {
  try {
    // Try to extract JSON from the response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || 
                      text.match(/\{[\s\S]*\}/);
    
    const jsonString = jsonMatch ? jsonMatch[1] || jsonMatch[0] : text;
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return { 
      error: "Failed to parse JSON response",
      ats_score: 75,
      strengths: ["Experience in relevant field", "Technical skills match"],
      weaknesses: ["Resume could be more tailored to the job"],
      recommendations: ["Add more keywords from the job description"]
    };
  }
}

/**
 * Conducts a comprehensive ATS analysis of the resume against a job description.
 *
 * @param {Object} resumeJson - The resume data in JSON format.
 * @param {string} jobDescription - The job description text.
 * @returns {Object} The ATS analysis result as a parsed JSON object.
 */
export async function atsScore(resumeJson: Record<string, any>, jobDescription: string) {
    console.log("Starting ATS scoring analysis with Groq...");
  
    const resumeText = resumeJson.text_content;
    const prompt = `Conduct a comprehensive ATS analysis of this resume against the job description.
    Provide detailed scoring in this exact JSON format:
    {
      "ats_score": 0-100,
      "score_breakdown": {
        "keyword_match": 0-100,
        "experience_match": 0-100,
        "skill_match": 0-100,
        "education_match": 0-100
      },
      "missing_keywords": ["list", "of", "missing", "terms"],
      "strengths": ["list", "of", "strengths"],
      "weaknesses": ["list", "of", "weaknesses"],
      "recommendations": ["list", "of", "actionable", "steps"]
    }
    
    Resume:
    ${resumeText}
    
    Job Description:
    ${jobDescription}
    
    Analysis Guidelines:
    1. Be strict but fair in scoring.
    2. Prioritize role-specific technical skills.
    3. Identify both hard and soft skills.
    4. Consider industry-standard terminology.`;
  
    try {
      const response = await groq.chat.completions.create({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 4096,
      });
  
      const responseText = response.choices[0].message.content || "";
      console.log("Response from Groq for ATS scoring:", responseText.substring(0, 200) + "...");
      
      return await parseJSON(responseText);
    } catch (error) {
      console.error("atsScore error:", error);
      return { 
        error: "Failed to analyze with Groq: " + (error as Error).message,
        ats_score: 75,
        strengths: ["Default strength 1", "Default strength 2"],
        weaknesses: ["Default weakness 1", "Default weakness 2"],
        recommendations: ["Default recommendation 1", "Default recommendation 2"]
      };
    }
}

/**
 * Analyzes the resume and provides structured feedback.
 *
 * @param {Object} resumeJson - The resume data in JSON format.
 * @returns {Object} The feedback result as a parsed JSON object.
 */
export async function resumeFeedback(resumeJson: Record<string, any>) {
    const resumeText = resumeJson.text_content;
    const prompt = `Analyze this resume and provide structured feedback in exactly this JSON format:
    {
      "overview": "summary",
      "section_analysis": {
        "summary": ["strength/weakness"],
        "experience": ["strength/weakness"],
        "education": ["strength/weakness"],
        "skills": ["strength/weakness"]
      },
      "priority_improvements": ["list", "of", "improvements"],
      "score_breakdown": {
        "clarity": 0-100,
        "relevance": 0-100,
        "quantification": 0-100,
        "ats_optimization": 0-100
      }
    }
    
    Resume Content:
    ${resumeText}`;
  
    try {
      const response = await groq.chat.completions.create({
        model: 'llama3-70b-8192',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.3,
        max_tokens: 4096,
      });
  
      const responseText = response.choices[0].message.content || "";
      console.log("Response from Groq for resume feedback:", responseText.substring(0, 200) + "...");
      
      return await parseJSON(responseText);
    } catch (error) {
      console.error("resumeFeedback error:", error);
      return { 
        error: "Failed to analyze with Groq: " + (error as Error).message,
        overview: "Failed to generate feedback",
        strengths: ["Default strength 1", "Default strength 2"],
        weaknesses: ["Default weakness 1", "Default weakness 2"],
        recommendations: ["Default recommendation 1", "Default recommendation 2"]
      };
    }
}

/**
 * Rephrases a given section of resume content.
 * This function improves the section by adding quantification, strong action verbs,
 * industry keywords, and enhanced readability.
 *
 * @param {string} sectionText - The text of the resume section.
 * @returns {Object} The rephrasing result as a parsed JSON object.
 */
export async function rephraseContent(sectionText: string) {
  const prompt = `Improve this resume section by:
1. Adding quantification.
2. Using strong action verbs.
3. Incorporating industry keywords.
4. Improving readability.
  
Return in this exact format:
{
  "original": "original text",
  "improved": "enhanced text",
  "improvements": ["list", "of", "changes"]
}

Original Section:
${sectionText}`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log("Response from Gemini for rephrasing content:", responseText.substring(0, 200) + "...");
    return await parseResponse(responseText);
  } catch (error) {
    console.error("rephraseContent error:", error);
    return { 
      error: (error as Error).message,
      ats_score: 75,
      strengths: ["Default strength 1", "Default strength 2"],
      weaknesses: ["Default weakness 1", "Default weakness 2"],
      recommendations: ["Default recommendation 1", "Default recommendation 2"]
    };
  }
}