import Link from "next/link";

interface MarketingLayoutProps {
  children: React.ReactNode;
}
export default async function MarketingLayout({children}: MarketingLayoutProps) {
  return (
    <div>
      <header className="flex justify-center text-center">
        <div className="h-20 w-full py-6">
          <nav>
            <Link href="/login">Login</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
