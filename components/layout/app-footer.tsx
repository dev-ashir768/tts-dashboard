import Link from "next/link";
import React from "react";

const AppFooter = () => {
  return (
    <footer className="w-full bg-card border-t border-border mt-auto py-4 px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-semibold text-foreground">TTS Dashboard</span>.
          All rights reserved.
        </p>
        <p>
          Developed by{" "}
          <Link
            href="https://ashirarif.com"
            target="_blank"
            className="font-medium text-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
          >
            Ashir Arif
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
