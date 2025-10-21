import { inngest } from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const signupEmail = inngest.createFunction(
  { id: "Signal" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    const userProfile = `
            -Country-${event.data.country},
            -Investment Goals-${event.data.investmentGoals}
            -Ris k Tolerance-${event.data.riskTolerance}
            -Preferred Industry-${event.data.preferredIndustry}
        `;

    const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace(
      "{{userProfile}}",
      userProfile
    );

    const response = await step.ai.infer("generate-welcome-intro", {
      model: step.ai.models.gemini({ model: "gemini-2.0-flash-lite" }),
      body: {
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      },
    });

    await step.run("send-welcome-email", async () => {
      const part = response.candidates?.[0].content?.parts?.[0];
      const introText =
        "Thanks for joining Signal, you now have the tools to track the market.";
    });

    return {
      success: true,
      message: "Welcome email sent successfully !",
    };
  }
);
