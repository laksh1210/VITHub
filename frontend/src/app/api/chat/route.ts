import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API client
// It requires GEMINI_API_KEY to be set in .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'API key not configured. Please add GEMINI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    // Use gemini-flash-latest for fast text generation
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-flash-latest',
      systemInstruction: "You are LION (Logical Interactive Operations Node), the advanced VITHub Campus Digital Twin Assistant. You provide helpful, concise, and highly accurate answers about campus facilities, navigation, schedules, and general university life."
    });

    // Convert the frontend message format to Gemini's expected Content[] format
    // Exclude the very last message because that's the prompt we will send separately
    let rawHistory = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'ai' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Gemini API requires the history to start with a 'user' message.
    // Our UI starts with an 'ai' greeting, so we must remove leading 'model' messages.
    while (rawHistory.length > 0 && rawHistory[0].role === 'model') {
      rawHistory.shift();
    }
    
    const history = rawHistory;

    const latestMessage = messages[messages.length - 1];

    if (!latestMessage) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 });
    }

    try {
      const chat = model.startChat({
        history
      });

      const result = await chat.sendMessage(latestMessage.content);
      const text = result.response.text();

      return NextResponse.json({ response: text });
    } catch (apiError: any) {
      console.warn('Gemini API call failed, using fallback response:', apiError.message);
      
      const fallbackResponse = `[SYSTEM MESSAGE]: Connection to main cognitive core interrupted due to high network traffic (${apiError.message.includes('503') ? '503 Service Unavailable' : 'Connection Timeout'}).\n\nI am currently operating in offline mode. Please try your request again in a few moments when the neural link is fully restored.`;
      
      return NextResponse.json({ response: fallbackResponse });
    }
  } catch (error: any) {
    console.error('General Error:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred while processing the request' },
      { status: 500 }
    );
  }
}
