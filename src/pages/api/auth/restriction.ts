import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { token } = req.body;
      console.log(1, token);
      const user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      } else {
        res.status(200).json({ message: "Authorized " });
      }
      break;
    }
    default: {
      res.status(400).json({ message: "Bad request!" });
    }
  }
};

export default user;
