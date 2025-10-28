"use server"

import { auth } from "@/lib/better-auth/auth";
import { inngest } from "@/lib/inngest/client";
import { headers } from "next/headers";

export const signupEmail = async ({
  fullName,
  email,
  password,
  country,
  investmentGoals,
  riskTolerance,
  preferredIndustry,
}: SignUpFormData) => {
  try {
    const response = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: fullName,
      },
    });

    if (response) {
      await inngest.send({
        name: "app/user.created",
        data: {
          email,
          name: fullName,
          country,
          investmentGoals,
          riskTolerance,
          preferredIndustry,
        },
      });
    }

    return { success: true, data: response };
  } catch (e) {
    console.log("Signup failed", e);
    return { success: false, error: "Sign up failed" };
  }
};

export const signInEmail = async ({ email, password }: SignInFormData) => {
  try {
    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    return {success:true,data:response}
  } catch (e) {
    console.log("Signup failed", e);
    return { success: false, error: "Sign in failed" };
  }
};


export const signOut = async()=>{
  try{
    await auth.api.signOut({headers:await headers()});
  }catch(e){
    throw new Error("Error while Signing out")
  }
}