import { type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Login: NextPage = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLogged, setLogin] = useState<boolean>(true);

  const onSubmit = async () => {
    await axios
      .post("/api/auth/login", {
        body: {
          username: usernameRef?.current?.value,
          password: passwordRef?.current?.value,
        },
      })
      .then(async (res) => {
        if (res?.status === 200) {
          console.log(res.data);
          localStorage.setItem("account-token", res.data);
          router.push("/home");
          setLogin(true);
        } else {
          console.log(false);
          setLogin(false);
        }
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex rounded-xl bg-cyan-50 px-12 py-12">
          <div className="mx-auto flex w-full max-w-md flex-col items-center justify-center space-y-8">
            <div className="border-box flex flex-col items-center justify-center space-y-2">
              {isLogged ? null : (
                <div className="rounded-lg border-2 border-red-500 py-2 px-2 text-red-500">
                  <p className="">Incorrect username or password</p>
                </div>
              )}
              <h1 className="mb-2 block text-2xl font-bold text-gray-700">
                Login
              </h1>
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Username
                </label>
                <input
                  ref={usernameRef}
                  type="text"
                  className="focus:shadow-outline w-full appearance-none rounded border border-slate-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Password
                </label>
                <input
                  ref={passwordRef}
                  type="password"
                  className="focus:shadow-outline w-full appearance-none rounded border border-slate-500 py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="flex flex-col">
                <Link
                  href="/register"
                  className="mb-2 block text-sm font-light text-gray-700"
                >
                  Register instead?
                </Link>
                <button
                  onClick={() => onSubmit()}
                  className="focus:shadow-outline rounded bg-sky-600 py-2 px-4 font-bold text-white hover:bg-sky-700 focus:outline-none"
                  type="button"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
