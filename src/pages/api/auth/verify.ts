import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { token } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          token: token,
        },
      });
      if (!user) {
        res.status(404).json({ message: "Unauthorized" });
        return;
      } else {
        // console.log(user);
        res.status(200).send(user);
      }
      break;
    }
    default: {
      res.status(400).json({ message: "Bad request!" });
    }
  }
};

export default user;
