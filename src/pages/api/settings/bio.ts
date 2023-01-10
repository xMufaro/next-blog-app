import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const bio = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { bio, id }: { bio: string; id: string } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          bio: bio.replaceAll("{n}", "\n"),
        },
      });
      res.status(200).json({ message: "Bio changed!", user: updatedUser });
    }
  }
};

export default bio;
