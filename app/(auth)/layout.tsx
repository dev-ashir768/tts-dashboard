import React from 'react';

interface AuthLayout {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayout> = ({ children }) => {
  return <>{children}</>;
};

export default AuthLayout;
