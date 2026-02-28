import React from "react";

interface HeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

const Header = ({ title, description, children }: HeaderProps) => {
  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && (
            <p className="text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-4">{children}</div>
      </div>
    </>
  );
};

export default Header;
