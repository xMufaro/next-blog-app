import React from "react";
import NavBar from "../components/NavBar";

export default function Main({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <NavBar />
      <main
        className={`flex min-h-screen items-center justify-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]`}
      >
        {children}
      </main>
    </div>
  );
}
