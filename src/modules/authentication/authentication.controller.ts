import { Request, Response } from "express";
import { registerUser, loginUser } from "./authentication.service";

export async function register(req: Request, res: Response) {
  const { email, username, password } = req.body;
  try {
    const token = await registerUser(email, username, password);
    res.status(200).send({ token });
  } catch (error: any) {
    res
      .status(400)
      .send({ message: "Falha ao Cadastrar", error: error.message });
  }
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  try {
    const token = await loginUser(email, password);
    res.status(200).send({ token });
  } catch (error: any) {
    res.status(400).send({ message: "Falha no Login", error: error.message });
  }
}
