import { NextPage } from "next";
import React from "react";

const Signout: NextPage = () => {
  React.useEffect(() => {
    fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("account-token");
        window.location.href = "/login";
      }
    });
  });

  return (
    <div className="h-[100vh] bg-black">
      <h1 className="text-neutral-500">signing out</h1>
    </div>
  );
};

export default Signout;
