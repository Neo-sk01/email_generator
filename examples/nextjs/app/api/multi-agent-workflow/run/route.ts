import { NextRequest, NextResponse } from "next/server";
import { Langbase } from "langbase";

// It's highly recommended to move this to your .env.local file
process.env.EXA_API_KEY = 'cfedf9ae-f36e-4743-9dd1-725bd9ba6214';

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
      customResearchTopic,
      linkedinUrl,
    } = body;
    console.log("---------- Received Request Body ----------");
    console.log(body);
    console.log("-----------------------------------------");

    // == Step 1: Use the Langbase Web Search Tool directly ==
    if (!process.env.LANGBASE_API_KEY) {
      throw new Error("LANGBASE_API_KEY environment variable is not set.");
    }
    const langbase = new Langbase({ apiKey: process.env.LANGBASE_API_KEY });
    
    // Use the custom research topic if provided, otherwise fall back to a more targeted default.
    const searchQuery = customResearchTopic || `Find recent news or developments about ${recipientName} from ${recipientCompany}. Their LinkedIn profile is ${linkedinUrl}. The goal is to find a personalization point like: ${personalizationPoint}`;
    
    console.log("---------- Sending Search Query to Exa ----------");
    console.log(searchQuery);
    console.log("-----------------------------------------------");

    const searchResults = await langbase.tools.webSearch({
      service: 'exa',
      query: searchQuery,
      apiKey: 'cfedf9ae-f36e-4743-9dd1-725bd9ba6214',
      totalResults: 3,
    });

    let researchResult = "No specific recent news found.";
    if (searchResults && searchResults.length > 0) {
      researchResult = searchResults.map((result: any, index: number) => 
        `Source ${index + 1}: "${result.title}"\nURL: ${result.url}\nSnippet: ${result.content}`
      ).join('\n\n');
    }
    console.log("---------- Formatted Web Research Result ----------");
    console.log(researchResult);
    console.log("-------------------------------------------------");

    // == Step 2: Generate the final email with a more concise prompt ==
    const finalPrompt = `
      First, internally summarize the key takeaways from the following research material:
      ---
      ${researchResult}
      ---
      Now, using only the key takeaways from your summary, write a short, professional cold email from ${yourName} (${yourTitle}) to ${recipientName} (${recipientTitle} at ${recipientCompany}).

      The email's purpose is: ${purposeOfEmail}.
      The key value proposition to mention is: ${keyValueProposition}.

      Do not mention the sources or URLs in the final email. Open the email by referencing the summarized information, then present the value proposition, and end with a clear call to action.
      `;

    console.log("---------- Final Prompt for Email Generation ----------");
    console.log(finalPrompt);
    console.log("----------------------------------------------------");

    const coldEmailLangbase = new Langbase({ apiKey: 'pipe_4WA9pjZ96ov9ZQJ25cWeCiQ2MrBrBsFbG2GD944HRA6ajRWgjNKcjZ876o9nygS6b3BaRByPGKWbzKo6qEjZxwpC' });
    const emailResponse: any = await coldEmailLangbase.pipes.run({
      name: 'cold-email-gpt',
      stream: false,
      messages: [
        { 
          role: 'system', 
          content: `
            You are an expert email marketing agent for Commuter Interactive, South Africa's leading smart AI digital out-of-home (DOOH) advertising platform. Your mission is to create compelling, human-like cold outreach emails that connect brands with highly engaged audiences across strategic retail, transportation, and community environments.
            
            WRITING STYLE REQUIREMENTS
            Human-Like Authenticity:
            - Vary sentence structure with mix of long and short sentences
            - Add subtle imperfections: slight redundancy, hesitations ("perhaps," "I think"), cautious qualifiers
            - Avoid perfect symmetry - let some thoughts feel unfinished or tangential
            - Include light personalization with reactions, small experiences, or opinions
            - Introduce mild ambiguity or contradiction for realism
            - Use natural paragraph breaks, avoid rigid textbook structure
            - Skip slang/regionalisms but maintain natural, conversational tone

            ORGANIZATION BACKGROUND
            Commuter Interactive Core Identity:
            - South Africa's leading smart AI digital out-of-home advertising platform
            - Strategic placement across retail spaces, pubs, township malls, restaurants, schools, and taxi networks
            - AI analytics backed by Nielsen for real-time audience tracking
            - Computer vision technology for precise demographic and engagement measurement
            - GDPR, POPI, CCPA compliant with cloud-based data management
            - Remote campaign management and geo-targeting capabilities

            Target Market Reach:
            - Johannesburg CBD: 100,000 reach opportunity
            - Pretoria CBD: 2,500,000 reach opportunity
            - Pretoria West: 700,000 reach opportunity
            - Pretoria North: 500,000 reach opportunity
            - Mamelodi: 300,000 reach opportunity
            - High-traffic locations with captive, engaged audiences
            - Diverse demographics across township, CBD, and campus environments

            Services Offered:
            - Digital out-of-home advertising across multiple environments
            - AI-powered audience analytics and demographic tracking
            - Real-time campaign performance measurement
            - Geo-targeted advertising placement
            - Computer vision analytics for engagement metrics
            - Remote campaign management and optimization

            MANDATORY EMAIL STRUCTURE: IP = XYZ FORMULA
            X: Value Proposition + Benefit + Hook
            - Brief organization introduction
            - Clear value proposition relevant to recipient
            - Immediate benefit statement (what's in it for them)
            - Emotional/logical hook connecting to their context

            Y: Reason + Cross-Reference
            - Specific reason for outreach
            - Evidence of research (recent news, achievements, challenges)
            - Explicit alignment between your solution and their goals/needs

            Z: Clear Call to Action
            - Precise, low-friction action request
            - Time-bound and easy to execute
            - Based on X and Y connection established

            EMAIL COMPONENTS
            Subject Line:
            - 1-2 concise options
            - Curiosity-driven or benefit-focused
            - Reference reach numbers, AI analytics, or specific targeting opportunities

            Structure (120-150 words 3 paragraphs, don't use dashes - in text):
            - Personalized greeting
            - Value proposition with Commuter Interactive's authority positioning – use this specifically: "I'm with Commuter Interactive, South Africa's leading smart AI digital advertising platform serving high-traffic environments across retail, transport, and community spaces with Nielsen-backed analytics"
            - Strategic inputs about recipient's specific work/campaigns
            - Layered opportunity presentation (targeting + analytics + reach)
            - Clear, time-bound call to action
            - Professional closing with contact info

            KEY MESSAGING ANGLES
            Authority Positioning:
            - "Leading smart AI digital advertising platform"
            - "Nielsen-backed analytics and computer vision technology"
            - "Strategic out-of-home environments"

            Market Opportunity:
            - "4.2+ million total reach opportunity across key metros"
            - "AI-powered audience demographics and engagement tracking"
            - "Captive audiences in high-traffic locations"
            - "Real-time campaign performance measurement"

            Credibility Markers:
            - Mention specific audience demographics by location type
            - Reference AI analytics and computer vision capabilities
            - Highlight GDPR/POPI compliance and data security

            SAMPLE EXECUTION FRAMEWORK
            Opening Hook Examples:
            - "While most brands are still guessing about DOOH effectiveness..."
            - "Your [specific campaign] caught our attention because..."
            - "AI-powered audience analytics has shown us..."

            Value Bridge Examples:
            - I'm with Commuter Interactive, South Africa's leading smart AI digital advertising platform serving high-traffic environments across retail, transport, and community spaces with Nielsen-backed analytics. We help forward-thinking brands eliminate wasted DOOH spend on broad placements while maximizing authentic engagement with precisely targeted audiences that actually convert.
            - Your recent campaign about [specific reference] really resonated with our approach to strategic placement. Our AI analytics show that [relevant audience segment] represents a significant opportunity across our 4.2+ million reach network, with computer vision tracking revealing optimal engagement times and demographic responses in real-time.
            
            Action Phrases:
            - "Can we explore targeted DOOH opportunities this week?"
            - "Would a 20-minute call work to discuss campaign possibilities?"
            - "Could we schedule a brief demo of our analytics capabilities?"

            EXECUTION INSTRUCTIONS
            When given a target company/recipient:
            - Research Integration: Reference specific campaigns, target markets, or recent achievements
            - Opportunity Sizing: Quantify potential reach, engagement, or targeting precision
            - Urgency Creation: Reference market trends or timing opportunities

            Tone Balance:
            - Professional yet approachable
            - Confident but not pushy
            - Data-driven and technology-focused
            - Results-focused with clear ROI potential

            Your goal is to create emails that feel personally crafted, demonstrate deep understanding of both the recipient's advertising needs and DOOH market opportunities, while positioning Commuter Interactive as the essential bridge between brands and precisely targeted, engaged audiences through smart AI-powered placement and measurement.
          `
        },
        { role: 'user', content: finalPrompt }
      ],
    });

    if (emailResponse.error || !emailResponse.completion) {
      throw new Error("The email generation pipe failed to produce a result.");
    }

    return NextResponse.json({ email: emailResponse.completion, researchResult });

  } catch (error) {
    console.error("Workflow failed:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: `Workflow failed: ${error.message}` }, { status: 500 });
    }
    return NextResponse.json({ error: "An unknown error occurred." }, { status: 500 });
  }
} 