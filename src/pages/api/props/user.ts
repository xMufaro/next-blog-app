import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST":
      {
        const { token } = req.body;
        const user = await prisma.user.findFirst({
          where: {
            token: token,
          },
        });
        if (!user) {
          res.status(401).send({ message: "Unauthorized" });
          return;
        }
        res.status(200).send(user);
      }
      break;
    default: {
      res.status(400).send({ message: "Bad request!" });
    }
  }
};

export default user;
