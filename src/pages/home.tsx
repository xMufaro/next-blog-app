import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import axios from "axios";
import { type UserModel } from "../server/db/client";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar";

const Home: NextPage = ({ data }: any) => {
  const router = useRouter();

  function getUser(uT: string) {
    fetch("/api/auth/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: uT }),
    }).then((res) => {
      if (res.status !== 200) {
        router.push("/login");
      }
    });
  }

  React.useEffect(() => {
    const user = localStorage.getItem("account-token");
    if (typeof user === "string") {
      getUser(user);
    } else {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <h1 className="text-white">Hey there!</h1>
      </main>
    </div>
  );
};

export default Home;
