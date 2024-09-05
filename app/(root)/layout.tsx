export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen w-full">
      <div className="flex size-full flex-col">{children}</div>
    </main>
  );
}