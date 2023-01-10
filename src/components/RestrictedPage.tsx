import { type NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const checkAccount = async (t: string): Promise<boolean> => {
  const res = await fetch("/api/auth/restriction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: t }),
  });
  console.log(res.status === 200);
  return res.status === 200;
};

const RestrictedPage = ({ children }: { children?: React.ReactNode }) => {
  const restricedPageRouter = useRouter();

  React.useEffect(() => {
    const userToken = localStorage.getItem("account-token");
    if (typeof userToken == "string")
      checkAccount(userToken).then((r) => {
        if (!r) restricedPageRouter.push("/login");
      });
    else restricedPageRouter.push("/login");
  });

  return <>{children}</>;
};

export default RestrictedPage;
