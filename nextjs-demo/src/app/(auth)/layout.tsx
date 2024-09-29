import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <h1>Auth layout</h1>
      {children}
    </div>
  );
}
