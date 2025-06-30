import { NextRequest, NextResponse } from "next/server";
import { Langbase } from "langbase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipientName } = body;

    // A simplified prompt for testing purposes
    const prompt = `Write a short, friendly cold email to ${recipientName}.`;

    // Initialize the client for the cold-email-gpt pipe
    const coldEmailLangbase = new Langbase({ apiKey: 'pipe_4WA9pjZ96ov9ZQJ25cWeCiQ2MrBrBsFbG2GD944HRA6ajRWgjNKcjZ876o9nygS6b3BaRByPGKWbzKo6qEjZxwpC' });
    
    const emailResponse: any = await coldEmailLangbase.pipes.run({
      name: 'cold-email-gpt',
      stream: false,
      messages: [
        { role: 'system', content: 'You are an expert at writing compelling cold emails.' },
        { role: 'user', content: prompt }
      ],
    });

    if (emailResponse.error) {
      throw new Error(`Pipe 'cold-email-gpt' failed: ${emailResponse.error.message}`);
    }

    if (!emailResponse.completion) {
      throw new Error("Pipe 'cold-email-gpt' returned an empty completion. Please try again.");
    }

    return NextResponse.json({ email: emailResponse.completion });

  } catch (error) {
    console.error("Workflow failed:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `Workflow failed: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "Workflow failed" }, { status: 500 });
  }
} 