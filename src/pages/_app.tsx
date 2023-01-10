import { type AppType } from "next/dist/shared/lib/utils";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export async function getUserId(token: string) {
  const res = await fetch("/api/props/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
    }),
  })
    .then(async (r) => r.json())
    .then((r) => r.id);
  return res;
}

export default MyApp;
