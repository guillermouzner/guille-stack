import {SiteFooter} from "@/components/site-footer";
import {MarketingNav} from "@/components/nav-mark";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({children}: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingNav />

      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
