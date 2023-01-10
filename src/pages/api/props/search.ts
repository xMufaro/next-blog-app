import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { type } = req.body;
      console.log(type);
      switch (type) {
        case "searchBar": {
          const query = req.body.query;
          const user = await prisma.user.findFirst({
            where: {
              username: {
                equals: query,
              },
            },
          });
          if (!user) {
            res.status(404).send({ message: "User not found!" });
            return;
          }
          res.status(200).send(user);
          break;
        }
        case "profileViewById": {
          const query = req.body.query;
          const user = await prisma.user.findFirst({
            where: {
              id: {
                equals: query,
              },
            },
            include: {
              posts: true,
            },
          });
          if (!user) {
            res.status(404).send({ message: "User not found!" });
          }
          res.status(200).send(user);
          break;
        }
      }
    }
  }
};

export default search;
