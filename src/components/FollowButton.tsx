import React, { useEffect } from "react";
import { prisma } from "../server/db/client";
import Link from "next/link";

export default function FollowButton({
  targetId,
  followerId,
}: {
  targetId: string;
  followerId: string;
}) {
  const [isFollowing, setIsFollowing] = React.useState<boolean>(false);

  const follow = async () => {
    if (isFollowing) {
      const res = await fetch("/api/follow/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetId: targetId,
          followerId: followerId,
        }),
      });
      if (res.status === 200) {
        setIsFollowing(false);
      }
    } else {
      const res = await fetch("/api/follow/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          targetId: targetId,
          followerId: followerId,
        }),
      });
      if (res.status === 200) {
        setIsFollowing(true);
      }
    }
  };

  const fetchData = async () => {
    const res = await fetch("/api/follow/find", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetId: targetId,
        followerId: followerId,
      }),
    });
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    if (targetId === followerId) return;
    fetchData().then((res) => {
      setIsFollowing(res.status === 200);
    });
  }, []);
  console.log(targetId === followerId, targetId, followerId);
  return (
    <div className="z-1 flex flex-row gap-3">
      {targetId === followerId ? (
        <Link
          href={`/settings`}
          className="rounded-[0.5rem] border-[4px] border-solid border-blue-500 bg-transparent px-4 py-3 text-lg font-bold text-blue-500 "
        >
          Edit Profile
        </Link>
      ) : isFollowing ? (
        <button
          onClick={() => follow()}
          className="rounded-[0.5rem] border-[4px] border-solid border-white bg-transparent px-4 py-3 text-lg font-bold text-white"
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => follow()}
          className="rounded-[0.5rem] bg-white px-4 py-3 text-lg font-bold text-neutral-700"
        >
          Follow
        </button>
      )}
    </div>
  );
}
