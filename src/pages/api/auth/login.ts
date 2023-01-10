import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log("xd")
    const { method } = req;
    switch(method) {
        case "POST": {
            const { username, password } = req.body.body;
            const user = await prisma.user.findFirst({
                where: {
                    username: username,
                    password: password,
                }})
            if(!user) {
                res.status(404);
                res.json({ message: "User not found!" })
                return;
            }
            res.status(200).send(user.token);
        }
        default: {
            return res.status(400).json({ message: "Bad request!" });
        }
    } 
};

export default user;
