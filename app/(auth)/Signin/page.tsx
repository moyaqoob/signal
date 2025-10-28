"use client"
import { signInEmail } from "@/app/api/auth.actions";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/SelectField";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const SignIn = () => {
   const [isSubmitting,setIsSubmit] = React.useState(false)
    const router = useRouter();
   const {register,handleSubmit}  = useForm<SignInFormData>()
   const onSubmit=async(data:SignInFormData)=>{
    try{
        setIsSubmit(true)
        console.log("signup the account")
        await signInEmail(data)
        router.replace("/");
        toast.info(`Welcome ${data.email}`)
    }catch(e){
        toast.error("Error Signing In")
    }
   }
   
  return <>
            <h1 className="form-title">Welcome Back</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
               

                <InputField
                    name="email"
                    label="Email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={Error}
                    validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={Error}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />

                

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>

                <FooterLink text="Already have an account?" linkText="Sign in" href="/Signup" />
            </form>
     </>
};

export default SignIn;
