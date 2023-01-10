import React from "react";
import RestrictedPage from "../components/RestrictedPage";
import Main from "../components/Main";
import { BiUserCircle } from "react-icons/bi";

export default function Settings() {
  const usernameInputRef = React.useRef<HTMLInputElement>(null);
  const bioInputRef = React.useRef<HTMLInputElement>(null);

  function handleUsernameChange() {
    if (usernameInputRef.current) {
      const username = usernameInputRef.current.value;
      if (username) {
        const token = localStorage.getItem("token");
        if (typeof token == "string") {
          fetch("/api/settings/username", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              token: token,
            }),
          });
        }
      }
    }
  }

  async function handleBioChange() {
    if (bioInputRef.current?.value) {
      const bio = bioInputRef.current.value;

      const token = localStorage.getItem("account-token");
      if (typeof token == "string") {
        const user = await fetch("/api/props/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: token,
          }),
        }).then((r) => r.json());
        fetch("/api/settings/bio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bio: bio,
            id: user.id,
          }),
        });
      }
    }
  }

  return (
    <>
      <RestrictedPage />
      <Main>
        <div className="flex h-[65vh] w-[50vw]">
          <div className="border-rounded flex items-start gap-5 border-r-[3px] border-solid border-neutral-600 border-opacity-70 p-[5rem]">
            <div className="flex items-center gap-2">
              <BiUserCircle size={25} fill={"white"} />
              <h1 className=" text-white">Profile</h1>
            </div>
          </div>
          <div className="flex flex-col gap-[3rem] px-[5rem] py-[3rem]">
            <div className="flex flex-row">
              <div>
                <h1 className="text-white">Username</h1>
                <input
                  type="text"
                  ref={usernameInputRef}
                  className="border-b-[2px] border-solid border-neutral-600 border-opacity-70 bg-transparent text-white focus:outline-none"
                />
              </div>
              <button
                className="ml-4 flex shrink-0 items-center justify-center rounded-[6px] bg-white px-[1rem] py-[0.5rem] font-bold text-black"
                onClick={() => handleUsernameChange()}
              >
                Change
              </button>
            </div>
            <div className="flex flex-row">
              <div>
                <h1 className="text-white">Bio</h1>
                <input
                  type="text"
                  ref={bioInputRef}
                  className="border-b-[2px] border-solid border-neutral-600 border-opacity-70 bg-transparent text-white focus:outline-none"
                />
              </div>
              <button
                className="ml-4 flex shrink-0 items-center justify-center rounded-[6px] bg-white px-[1rem] py-[0.5rem] font-bold text-black"
                onClick={() => handleBioChange()}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </Main>
    </>
  );
}
