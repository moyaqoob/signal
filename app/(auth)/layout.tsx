import Image from "next/image";
import Link from "next/link";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full auth-layout">
      <section className="auth-left-section scrollbar-hide-default">
        <Link href={"/"} className="auth-logo">
          <Image
            width={100}
            height={100}
            src={"/images/logo.png"}
            alt="Logo Image"
          />
        </Link>
        <div className="">{children}</div>
      </section>

      <section className="auth-right-section text-white">
        <blockquote className="z-20 font- text-5xl leading-12">
          &quot;Signalist turned my watchlist into a winning list.The alerts
          are spot-on, and I feel more confident making moves in the
          market.&quot;
        </blockquote>

        <div className="flex justify-between p-4">
          <div className="flex flex-col items-center gap-2">
            <cite className="text-2xl font-semibold">-Yaqoob</cite>
            <p>Retail Investor</p>
          </div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((item) => (
              <Image
                width={40}
                height={40}
                key={item}
                src={"/icons/star.svg"}
                color="white"
                alt="Star Logo"
              />
            ))}
          </div>
        </div>

        <div className="flex-1 relative top-3">
          <Image
            src="/images/dashboard.png"
            alt="Dashboard Preview"
            width={1440}
            height={1550}
            className="border-6 border-gray-800 left-40 hidden h-auto max-w-none  lg:block rounded-xl w-[1024px] shadow-2xl absolute top-0"
          />
        </div>
        
      </section>
    </main>
  );
};

export default Layout;
