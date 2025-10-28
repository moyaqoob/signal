import { inngest } from "@/lib/inngest/client";
import { PERSONALIZED_WELCOME_EMAIL_PROMPT } from "./prompts";

export const signupEmail = inngest.createFunction(
  { id: "signupEmail" },
  { event: "app/user.created" },
  async ({ event, step }) => {
    try{

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
  }catch(e){
    throw new Error("Error in Signup email");
  }
  }
);


export const sendDailyNewsSummary  = inngest.createFunction(
  {id:'daily-news-summary'},
  [ {event:"app/send.daily.news"},{cron:'0 12 * * *'}],
  async({event,step})=>{
    try{

    }catch(error){
      console.error("Error in creating the daily news")
      return {status}
    }
  }
)