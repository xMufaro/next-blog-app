import { NextApiRequest, NextApiResponse } from "next";

const signout = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "POST": {
      res.status(200).json({ message: "Signed out!" });
    }
  }
};

export default signout;
