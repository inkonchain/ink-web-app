import { Footer } from "@/components/Footer";
import { AnimatedInkLogoIcon } from "@/components/icons/InkLogo";
import { ToggleThemeShortcut } from "@/components/ToggleThemeShortcut";
import { Link, routing } from "@/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ToggleThemeShortcut />
      <div className="fixed inset-x-4 top-8 flex flex-col items-center z-10">
        <Link className="flex gap-2 w-fit px-2 py-1" href="/">
          <AnimatedInkLogoIcon />
        </Link>
      </div>

      <div className="flex-1 relative pb-24 pt-32 container mx-auto">
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}
