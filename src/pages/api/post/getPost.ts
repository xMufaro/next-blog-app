import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { postId } = req.body;
      const post = await prisma.post.findFirst({
        where: {
          id: postId,
        },
      });
      res.status(200).json({ message: "Post found!", post: post });
      break;
    }
  }
};

export default getPost;
