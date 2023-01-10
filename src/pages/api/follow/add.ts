import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const addFollow = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { targetId, followerId }: { targetId: string; followerId: string } =
        req.body;
      await prisma.user.update({
        where: {
          id: followerId,
        },
        data: {
          following: {
            connect: {
              id: targetId,
            },
          },
        },
      });
      const user = await prisma.user.update({
        where: {
          id: targetId,
        },
        data: {
          followers: {
            connect: {
              id: followerId,
            },
          },
        },
      });
      console.log(user);
      res.status(200).json({ message: "Followed!" });
      break;
    }
    default: {
      return res.status(400).json({ message: "Bad request!" });
    }
  }
};

export default addFollow;
