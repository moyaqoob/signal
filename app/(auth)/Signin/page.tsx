"use client"
import { signInEmail } from "@/app/api/auth.actions";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
  const [isSubmitting, setIsSubmit] = React.useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormData>();

  const onSubmit = async (data: SignInFormData) => {
    try {
      setIsSubmit(true);
      await signInEmail(data);
      router.replace("/");
      toast.info(`Welcome back`);
    } catch (e) {
      toast.error("Authentication failed");
      setIsSubmit(false);
    }
  };

  return (
    <>
      <h1 className="form-title">Welcome Back</h1>
      <p className="form-subtitle">SIGNAL PRO · INVESTOR TERMINAL</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <InputField
          name="email"
          label="Email"
          placeholder="you@example.com"
          register={register}
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: /^\w+@\w+\.\w+$/,
            message: "Enter a valid email",
          }}
        />

        <InputField
          name="password"
          label="Password"
          placeholder="············"
          type="password"
          register={register}
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Authenticating..." : "Access Terminal"}
        </Button>

        <FooterLink
          text="No account yet?"
          linkText="Create one"
          href="/Signup"
        />
      </form>
    </>
  );
};

export default SignIn;
