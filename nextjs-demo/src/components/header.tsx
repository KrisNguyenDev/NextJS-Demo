import React from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";

export default function Header() {
  return (
    <div className="max-w-7xl mx-auto px-4 flex justify-between">
      <ul className="flex space-x-3">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
      </ul>
      <ModeToggle />
    </div>
  );
}
