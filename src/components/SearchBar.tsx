import React, { useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import Link from "next/link";

export default function SearchBar() {
  const [searchBarInput, setSearchBarInput] = useState<string>("");
  const [searchBarResult, setSearchBarResult] = useState<any>();

  const fetchData = async () => {
    const res = await fetch(`/api/props/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: searchBarInput,
        type: `searchBar`,
      }),
    });
    if (!res.ok) return setSearchBarResult(null);
    const data = await res.json();
    console.log(data);
    setSearchBarResult(data);
  };

  useEffect(() => {
    if (searchBarInput.length < 3) return setSearchBarResult(null);
    fetchData();
  }, [searchBarInput]);

  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-[3rem] bg-neutral-600 bg-opacity-70 px-4 py-3">
        <input
          onChange={(e) => setSearchBarInput(e.target.value)}
          type="text"
          value={searchBarInput}
          name=""
          id=""
          placeholder="Search..."
          className="border-none bg-transparent text-neutral-300 focus:outline-none"
        />
      </div>
      <div className="fixed top-[4.5rem]">
        {searchBarResult ? (
          <Link href={`/user/${searchBarResult.id}`}>
            <div className="flex items-center gap-2 rounded-[3rem] bg-neutral-600 bg-opacity-70 px-3 py-3 text-white">
              <BiUserCircle size={30} />
              <p className="font-bold">{searchBarResult.username}</p>
            </div>
          </Link>
        ) : null}
      </div>
    </div>
  );
}
