import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const addFollow = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { targetId, followerId }: { targetId: string; followerId: string } =
        req.body;
      const targetFollow = await prisma.user.findFirst({
        where: {
          id: targetId,
          followers: {
            some: {
              id: followerId,
            },
          },
        },
      });
      return targetFollow
        ? res.status(200).json({ message: "Already following!" })
        : res.status(404).json({ message: "Not following!" });
    }
    default: {
      return res.status(400).json({ message: "Bad request!" });
    }
  }
};

export default addFollow;
