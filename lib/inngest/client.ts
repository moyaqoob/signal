import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "Signal",
  eventKey:process.env.INNGEST_EVENT_KEY! ,
  ai: { gemini: process.env.GEMINI_KEY! },
});
