import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: Request) {
  try {
    const { address1, address2 } = await request.json();

    if (!address1 || !address2) {
      return NextResponse.json(
        { error: "Both addresses are required" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
    Compare these two addresses and determine if they refer to the same location. 
    Address 1: ${address1}
    Address 2: ${address2}
    
    Analyze them considering:
    1. Street numbers and names
    2. City, state, and postal code
    3. Building names or landmarks if present
    4. Possible formatting differences
    
    Respond only in this JSON format:
    {
      "match": boolean,
      "confidence": number between 0 and 1,
      "explanation": "brief explanation of the comparison"
    }`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
    const cleanedText = text.replace(/^```json\s*/g, '').replace(/\s*```$/g, '').trim();

    let parsedResponse;

    try {
      parsedResponse = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Error parsing response as JSON:", e);
      return NextResponse.json({ error: "Invalid response format from API" }, { status: 500 });
    }

    return NextResponse.json(parsedResponse);
  } catch (error: unknown) {  // Specify the error type here
    console.error("Error comparing addresses:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to compare addresses", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to compare addresses", details: "Unknown error" },
      { status: 500 }
    );
  }
}
