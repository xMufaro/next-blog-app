import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const post = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const {
        title,
        content,
        token,
        published,
        appxReadTime,
        authorId,
      }: {
        title: string;
        content: string;
        token: string;
        published: boolean;
        appxReadTime: string;
        authorId: string;
      } = req.body;

      const post = await prisma.user.update({
        where: {
          id: authorId,
        },
        data: {
          posts: {
            create: {
              title,
              content,
              published,
              appxReadTime,
            },
          },
        },
      });
      res.status(200).json({ message: "Post created!", post: post });
      break;
    }
    case "DELETE": {
      const { postId }: { postId: string } = req.body;
      const post = await prisma.post.delete({
        where: {
          id: postId,
        },
      });
      res.status(200).json({ message: "Post deleted!", post: post });
    }
  }
};

export default post;
