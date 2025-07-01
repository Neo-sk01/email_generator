import { NextRequest, NextResponse } from "next/server";
import { Langbase } from "langbase";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      recipientName,
      recipientTitle,
      recipientCompany,
      yourName,
      yourTitle,
      yourCompany,
      purposeOfEmail,
      keyValueProposition,
      personalizationPoint,
    } = body;

    // Step 1: Web Research
    const webResearchLangbase = new Langbase({ apiKey: 'pipe_8o82Kp5EJxRKeTzcvgugRyVwXHgpDkrL316HXfvXQsUc8e6Qw1fgbEgYb41Hfb9JrAhbtR5HgSTpgxXnXGsC1ZB' });
    const researchResponse: any = await webResearchLangbase.pipes.run({
      name: 'web-research-agent',
      stream: false,
      messages: [{ role: 'user', content: `Find recent news or articles about ${recipientCompany}. The goal is to find a personalization point for a cold email. Focus on: ${personalizationPoint}` }],
    });
    if (researchResponse.error) { throw new Error(`Pipe 'web-research-agent' failed: ${researchResponse.error.message}`); }
    const researchResult = researchResponse.completion;
    console.log("---------- Web Research Result ----------");
    console.log(researchResult);
    console.log("---------------------------------------");

    // Step 2: Construct a detailed prompt, conditionally including the research result
    let finalPrompt;
    if (researchResult && researchResult.trim() !== "null" && researchResult.trim() !== "") {
      // If we have a research result, use the detailed prompt
      finalPrompt = `
        Generate a professional and persuasive cold email with the following details:
        - Recipient's Name: ${recipientName}
        - Recipient's Title: ${recipientTitle}
        - Recipient's Company: ${recipientCompany}
        - Sender's Name: ${yourName}
        - Sender's Title: ${yourTitle}
        - Sender's Company: ${yourCompany}
        - Purpose of this email: ${purposeOfEmail}
        - Key Value Proposition to highlight: ${keyValueProposition}
        - Recent Information / Research Result: "${researchResult}"
        The email should be engaging and incorporate the 'Recent Information' to create a highly personalized opening. It must clearly state the value proposition and end with a clear call to action.
      `;
    } else {
      // If research fails or returns nothing, fall back to a more general prompt
      console.log("Web research returned no result. Using fallback prompt.");
      finalPrompt = `
        Write a short, friendly, and professional cold email to ${recipientName} who works at ${recipientCompany}.
        The email is from ${yourName} (${yourTitle} at ${yourCompany}).
        The purpose is to discuss: ${purposeOfEmail}.
        Mention this key value proposition: ${keyValueProposition}.
      `;
    }

    console.log("---------- Final Prompt for Email Generation ----------");
    console.log(finalPrompt);
    console.log("----------------------------------------------------");

    // Initialize the client for the cold-email-gpt pipe
    const coldEmailLangbase = new Langbase({ apiKey: 'pipe_4WA9pjZ96ov9ZQJ25cWeCiQ2MrBrBsFbG2GD944HRA6ajRWgjNKcjZ876o9nygS6b3BaRByPGKWbzKo6qEjZxwpC' });
    
    const emailResponse: any = await coldEmailLangbase.pipes.run({
      name: 'cold-email-gpt',
      stream: false,
      messages: [
        { role: 'system', content: 'You are an expert at writing compelling and highly personalized cold emails based on research.' },
        { role: 'user', content: finalPrompt }
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