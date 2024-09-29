import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function layout({ children }: Props) {
  return (
    <div>
      <h1>Login layout</h1>
      {children}
    </div>
  );
}
