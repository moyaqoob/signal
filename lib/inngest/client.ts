import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Signal",
  ai: { gemini: process.env.GEMINI_API_KEY! },
});
