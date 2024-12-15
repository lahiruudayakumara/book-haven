export const ScreenContainer = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col h-auto items-center w-full bg-transparent">
      <div className="w-full 2xl:w-2/3 h-auto bg-transparent">{children}</div>
    </div>
  );
};
