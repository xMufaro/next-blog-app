import { useEffect, useState } from "react";
import {
  BiUserCircle,
  BiLinkExternal,
  BiCog,
  BiExit,
  BiPlus,
} from "react-icons/bi";
import SearchBar from "./SearchBar";
import Link from "next/link";

export default function NavBar() {
  const [user, setUser] = useState<any>();
  const [propMenu, setPropMenu] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("account-token");
    if (typeof token !== "string") {
      return;
    }
    async function fetchData() {
      const res = await fetch("/api/props/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      });
      const data = await res.json();
      return data;
    }
    fetchData().then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <div className="fixed m-4 flex w-full justify-around">
      <div className="flex items-center gap-4">
        <SearchBar />
        <Link href={"/post/new"}>
          <BiPlus fill={"white"} size={25} />
        </Link>
      </div>
      <div className="relative flex font-semibold text-white">
        <button
          className="flex flex-row items-center gap-3 transition-all hover:underline "
          onClick={() => setPropMenu(!propMenu)}
        >
          <BiUserCircle className="text-3xl" />
          <p className="duration-300">{user?.username}</p>
        </button>
        {propMenu && (
          <div className="z-2 fixed top-[4rem] min-w-[10rem] rounded-[0.5rem] bg-neutral-600 bg-opacity-70 py-2 px-3 text-base leading-7 text-neutral-300 shadow-md">
            <Link
              href={`/user/${user.id}`}
              className="flex flex-row items-center justify-between transition-all hover:bg-neutral-700 hover:p-1 hover:text-white"
            >
              <p className="">Your profile</p>
              <BiLinkExternal size={20} />
            </Link>
            <Link href={"/settings"}>
              <div className="flex flex-row items-center justify-between transition-all hover:bg-neutral-700 hover:p-1 hover:text-white">
                <p className="">Settings</p>
                <BiCog size={20} />
              </div>
            </Link>
            <Link href={"/signout"}>
              <div className="flex flex-row items-center justify-between transition-all hover:bg-neutral-700 hover:p-1 hover:text-white">
                <p className="">Sign out</p>
                <BiExit size={20} />
              </div>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
