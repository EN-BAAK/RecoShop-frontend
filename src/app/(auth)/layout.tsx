export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="bg-gradient-to-br from-background via-green-50/30 to-background min-h-screen py-4 px-4 flex flex-col items-center justify-center relative"
    >
      <div className="min-h-screen px-4 flex flex-col items-center justify-center relative">
        <div className="mb-8 text-center animate-fade-in-up">
          <h1 className="text-primary font-heading font-bold text-4xl md:text-5xl mb-2">
            RecoShop
          </h1>

          <p className="font-sans text-sm text-muted-foreground">
            Your trusted eCommerce platform
          </p>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
