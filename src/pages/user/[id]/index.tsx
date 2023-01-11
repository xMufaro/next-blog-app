import { useRouter } from "next/router";
import { type NextPage } from "next";
import React from "react";
import axios from "axios";
import NavBar from "../../../components/NavBar";
import { BiUserCircle } from "react-icons/bi";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

type PostPreview = {
  id: string;
  img: string;
  title: string;
  content: string;
};

const Index: NextPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState<any>();
  const [myUser, setMyUser] = React.useState<any>();

  async function handlePostDelete(postId: string) {
    const token = localStorage.getItem("account-token");
    if (typeof token !== "string") {
      return;
    }
    const res = await fetch(`/api/post/post`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        postId,
      }),
    });
    if (res.status !== 200) router.push("/404");
    router.reload();
  }

  async function getUser(uT: string) {
    await axios
      .post("/api/auth/verify", {
        body: {
          token: uT,
        },
      })
      .then((res) => {
        res.data;
      });
  }

  React.useEffect(() => {
    const user = localStorage.getItem("account-token");
    if (typeof user === "string") {
      getUser(user);
    } else {
      router.push("/login");
    }
  }, [router]);

  const fetchData = async () => {
    const id = router.query.id;
    const res = await fetch(`/api/props/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: id,
        type: `profileViewById`,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) router.push("/404");
    setUser(data);
  };
  const fetchMyData = async () => {
    const token = localStorage.getItem("account-token");
    if (typeof token !== "string") {
      return;
    }
    const res = await fetch(`/api/props/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
      }),
    });
    const data = await res.json();
    if (res.status !== 200) router.push("/404");
    setMyUser(data);
  };

  React.useEffect(() => {
    const fetch = async () => {
      await fetchMyData();
      await fetchData();
    };
    fetch();
  }, [router.query.id]);

  console.log(user);
  return (
    <div className="z-1">
      <Head>
        <title>Profile - {user?.username}</title>
      </Head>

      {user ? (
        <main className="flex min-h-screen flex-col bg-gradient-to-b from-[#2e026d] to-[#15162c]">
          <div className=" top-[50%] mx-[6rem] flex translate-y-[50%] flex-col ">
            <div className="flex w-fit items-center justify-between">
              <div className="flex flex-row items-center  gap-4 text-white">
                <BiUserCircle size={120} />
                <div className="flex flex-col gap-1">
                  <h1 className="text-4xl ">{user?.username}</h1>
                  <div className="flex flex-row gap-3 text-xl text-neutral-300">
                    <p className="">
                      {user?.posts?.length ? user?.posts?.length : 0} posts
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-[1vh]">
              <span className=" rounded-xl bg-gray-600 px-[50%] text-[2px]" />
              <div className="m-[1vh]">
                <p className="text-white ">{user?.bio ? user.bio : "No bio"}</p>
              </div>
              <span className=" rounded-xl bg-gray-600 px-[50%] text-[2px]" />
              <div className="m-[1vh] flex flex-col gap-4 text-neutral-200 overflow-y-scroll">
                {user?.posts
                  ? user?.posts.map((post: PostPreview) => {
                      return (
                        <div
                          key={post.id}
                          className="flex cursor-pointer flex-row justify-between gap-3 rounded-xl bg-neutral-600 bg-opacity-70 px-4 py-3 transition-all duration-200 hover:bg-neutral-700"
                        >
                          <div className="flex flex-row">
                            <Image src={post.img} alt={""} />
                            <div>
                              <h1 className="font-bold">{post.title}</h1>
                              <p>
                                {post.content.length > 30
                                  ? `${post.content.substring(0, 30)}...`
                                  : post.content}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row gap-4">
                            <div>
                              <button
                                className="rounded-xl border-2 border-solid border-red-700 bg-transparent px-4 py-2 font-bold "
                                onClick={() => handlePostDelete(post.id)}
                              >
                                Delete
                              </button>
                            </div>

                            <Link
                              href={`/post/view/${post.id}`}
                              className="flex items-center rounded-xl bg-blue-500 px-4 py-2 font-bold text-neutral-200 transition-all duration-200 hover:bg-blue-600"
                            >
                              View Post
                            </Link>
                          </div>
                        </div>
                      );
                    })
                  : "No posts"}
              </div>
            </div>
          </div>
          <NavBar />
        </main>
        
      ) : (
        <div>User not found!</div>
      )}

    </div>
  );
};
export default Index;
