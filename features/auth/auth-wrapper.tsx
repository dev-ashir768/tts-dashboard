"use client";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Blocks } from "lucide-react";
import Image from "next/image";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <div className="min-h-svh w-full flex bg-background relative selection:bg-primary/30">
      <div className="absolute top-4 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Left Pane - Branding & Visuals */}
      <div className="hidden lg:flex w-1/2 bg-zinc-950 flex-col justify-between p-12 relative overflow-hidden text-white">
        {/* Abstract Background pattern or gradient */}
        <div className="absolute inset-0 bg-primary/20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 right-0 w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="relative z-10 mt-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Next-Generation 3PL Management
          </h2>
          <p className="text-zinc-400 text-lg max-w-md">
            Streamline your logistics, empower your workforce, and deliver
            unparalleled customer experiences with our ultimate dashboard.
          </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="flex flex-1 items-center justify-center p-8 lg:p-12 relative bg-card shadow-[inset_1px_0_0_0_var(--color-border)]">
        <div className="w-full max-w-[420px] mx-auto flex flex-col items-center">
          <div className="flex flex-col items-center text-center mb-8 gap-2">
            <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary mb-2">
              <Blocks className="size-6" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              {title}
            </h1>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">
                {description}
              </p>
            )}
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
