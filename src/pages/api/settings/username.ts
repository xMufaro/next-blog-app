import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

const changeUsername = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      const { username, token }: { username: string; token: string } = req.body;
      await fetch("/api/props/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
        }),
      }).then(async (authResponse) => {
        if (!authResponse.ok)
          return res.status(401).json({ message: "Unauthorized" });
        const user = await authResponse
          .json()
          .then<string>(async (user) => user.id);
        const checkUsername = await prisma.user.findFirst({
          where: {
            username: username,
          },
        });
        if (checkUsername)
          return res.status(400).json({ message: "Username already taken!" });
        const updatedUser = await prisma.user.update({
          where: {
            id: user,
          },
          data: {
            username: username,
          },
        });
        res
          .status(200)
          .json({ message: "Username changed!", user: updatedUser });
      });
    }
  }
};

export default changeUsername;
