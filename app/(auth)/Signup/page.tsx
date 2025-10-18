import { Button } from "@/components/ui/button";
import Link from "next/link";

const Signup = () => {
  return (
    <>
      <div className="text-white font-bold ">Sign In page here</div>
      <Link href={"/Signin"} className="inline-flex">
        <Button variant={"destructive"}>Signin</Button>
      </Link>
    </>
  );
};

export default Signup;
