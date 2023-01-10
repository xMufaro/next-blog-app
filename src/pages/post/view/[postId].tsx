import { NextPage } from "next";
import React from "react";
import RestrictedPage from "../../../components/RestrictedPage";
import { useRouter } from "next/router";
import Main from "../../../components/Main";
import { BiUserCircle } from "react-icons/bi";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  appxReadTime: string;
  published: boolean;
}

const PageView: NextPage = () => {
  const router = useRouter();
  const { postId } = router.query;

  const [post, setPost] = React.useState<any>();
  const [author, setAuthor] = React.useState<any>();

  async function getPost() {
    const res = await fetch(`/api/post/getPost`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
      }),
    });
    if (res.status !== 200) router.push("/404");
    const data = await res.json();
    await getAuthor(data.post.authorId);
    return setPost(data);
  }

  async function getAuthor(authorId: string) {
    const res = await fetch(`/api/props/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: authorId,
        type: "profileViewById",
      }),
    });
    if (res.status !== 200) router.push("/404");
    const data = await res.json();
    return setAuthor(data);
  }

  React.useEffect(() => {
    getPost();
  }, [postId]);
  return (
    <RestrictedPage>
      <div>
        <Main>
          <div className="flex w-[55vw] gap-10 text-white">
            <div className="h-[50vh] w-[40vw]">
              <div className="border-neutral-white mb-2 gap-2 rounded-sm border-b-2 pb-2">
                <h1 className="text-4xl font-bold">{post?.post?.title}</h1>
                <div className="flex flex-row gap-4 text-neutral-300">
                  <p className="text-sm">Written by {author?.username}</p>
                  <p className="text-sm">
                    Updated on{" "}
                    {new Date(post?.post?.updatedAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm">
                    Read time: {post?.post?.appxReadTime}
                  </p>
                </div>
              </div>
              <div className="m-2">{post?.post?.content}</div>
            </div>

            <div className="mt-6">
              <div className="flex h-fit w-[15vw] flex-col items-center rounded-lg border-2 border-neutral-200">
                <div className="border-netural-200 mb-10 flex w-full flex-col items-center gap-2 border-b-2 py-10">
                  <BiUserCircle size={80} />
                  {author?.username}
                </div>
                <div className="mb-10 h-fit">
                  {author?.bio ? author.bio : "No bio"}
                </div>
              </div>
            </div>
          </div>
        </Main>
      </div>
    </RestrictedPage>
  );
};
export default PageView;
