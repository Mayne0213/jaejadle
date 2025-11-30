"use client";

import React from "react";
import SubNavbar from "@/components/widgets/SubNavbar";

export default function SubPagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SubNavbar />
      <div className="flex items-center justify-center">
        <div className="w-full max-w-[1400px] flex items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}

