import { NextFunction, Request, Response } from "express";
import { prisma } from "../server";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      res.status(400).json({ error: "Usuário já existe" });
      return;
    }

    const newBloguser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    res.status(200).json(newBloguser);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user || user.password !== password) {
      res.status(400).json({ error: "Credenciais inválidas" });
      return;
    }

    const token = jwt.sign({ user }, "96172890", {
      expiresIn: 4500, // expires in 45 minutes
    });

    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ error: "Token não encontrado" });
    return;
  }
  try {
    const decoded = jwt.verify(token, "96172890");
    res.status(200).json(decoded);
    next();
  } catch (e) {
    res.status(400).json({ error: "Token inválido" });
  }
};

export default { registerUser, loginUser, verifyToken };
