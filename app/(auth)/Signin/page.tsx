import { Button } from "@/components/ui/button";
import Link from "next/link";

const SignIn = () => {
  return <>
     <div className="text-white font-bold ">Sign In page here</div>
     <Link href={"/Signup"}>
        <Button variant={"destructive"}>
            Signup
        </Button>
     </Link>
  </>;
};

export default SignIn;
