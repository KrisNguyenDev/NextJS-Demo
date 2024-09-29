"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface ButtonRedirectProps {
  href: string;
  name: string;
}

export default function ButtonRedirect({ href, name }: ButtonRedirectProps) {
  const router = useRouter();
  return <Button onClick={() => router.push(href)}>{name}</Button>;
}
