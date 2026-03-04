import QueryProvider from "@/providers/QueryProvider";
// import { ThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    // <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryProvider>{children}</QueryProvider>
    // </ThemeProvider>
  );
};

export default Providers;
