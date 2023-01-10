import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../../server/db/client";

export function generateToken() {
    const token = Math.random().toString(36).substr(2);
    return token;
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;
    switch(method) {
        case "POST": {
            const { username, password, email } = req.body.body;
            console.log(username, password, email)
            const user = await prisma.user.create({
                data: {
                    username: username,
                    password: password,
                    email: email,
                    token: generateToken()  
                }})

            res.status(200)
            return res.json(user);
        }
        default: {
            res.status(400).json({ message: "Bad request!" })
        }
    } 
};

export default register;
