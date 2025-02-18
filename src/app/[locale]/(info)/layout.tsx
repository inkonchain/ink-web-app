import { routing } from "@/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="ink:bg-background-container p-2 rounded-lg pt-8 mb-8 mx-2 flex items-center justify-center max-w-4xl w-full">
      <div className="max-w-2xl p-4">{children}</div>
    </div>
  );
}
