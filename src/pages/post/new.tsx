import React from "react";
import type { NextPage } from "next";
import RestrictedPage from "../../components/RestrictedPage";
import Main from "../../components/Main";
import { getUserId } from "../_app";
import { useRouter } from "next/router";

export enum ReadTimeConversion {
  "lowerThanMinute" = "less than a minute",
  "inMinutes" = "minutes",
}

export type PostData = {
  title: string;
  content: string;
  readTime: string;
  published: true;
  authorId: string;
};

const New: NextPage = () => {
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const readTimeConversion = await calcReadTime(
      `${data["post.title"]} ${data["post.content"]}`
    ).then(async (r: number) => {
      if (r <= 1) {
        return ReadTimeConversion.lowerThanMinute;
      } else return `${r} ${ReadTimeConversion.inMinutes}`;
    });
    const userToken = localStorage.getItem("account-token") as string;
    const userId = (await getUserId(userToken).then((r) => r)) as string;
    await postData(
      {
        title: data["post.title"]?.toString() as string,
        content: data["post.content"]?.toString() as string,
        readTime: readTimeConversion,
        published: true,
        authorId: userId,
      },
      userToken
    ).then((r) => {
      if (r.error) throw new Error(r.error);
      router.push(`/post/view/${r.post.id}`);
    });
  }

  async function calcReadTime(text: string) {
    const wordsPerMinute = 200;
    const wordsLength = text.split(/\s/g).length;
    const minutes = wordsLength / wordsPerMinute;
    const readTime = Math.ceil(minutes);
    return readTime;
  }

  async function postData(data: PostData, token: string) {
    const res = await fetch("/api/post/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        appxReadTime: data.readTime,
        published: true,
        authorId: data.authorId,
        token: token,
      }),
    });
    return res.json();
  }

  return (
    <RestrictedPage>
      <div>
        <Main>
          <div className="w-[30vw]">
            <h1 className="text-4xl text-white">New Post</h1>
            <span className=" rounded-xl bg-gray-600 px-[50%] text-[2px]" />
            <form
              className="m-2 flex flex-col items-start gap-4 text-white"
              onSubmit={(e) => onSubmit(e)}
            >
              <div className="flex flex-col gap-2">
                <p>Title</p>
                <input
                  type="text"
                  name="post.title"
                  className="rounded-sm p-1 text-neutral-700"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <p>Content</p>
                <textarea
                  name="post.content"
                  className="h-[10vh] w-fit resize rounded-sm p-1 text-neutral-700"
                  required
                />
              </div>
              <div className="flex flex-row gap-8">
                <button
                  type="submit"
                  className=" rounded-md bg-blue-600 px-4 py-2"
                >
                  Post
                </button>
                <button type="reset">
                  <a href="/post">Cancel</a>
                </button>
              </div>
            </form>
          </div>
        </Main>
      </div>
    </RestrictedPage>
  );
};

export default New;
