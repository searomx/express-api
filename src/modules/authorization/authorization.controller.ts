import { Request, Response } from "express";

import {
  requestRoleChange,
  getRoleRequests,
  handleRoleRequest,
} from "./authorization.service";

export async function requestWriterRole(req: Request, res: Response) {
  const userId = res.locals.user;
  try {
    await requestRoleChange(userId, "WRITER");
    res.status(200).send({ message: "Pedido para se tornar um escritor enviado" });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function viewRoleRequests(req: Request, res: Response) {
  try {
    const requests = await getRoleRequests();
    res.send(requests);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}

export async function updateRoleRequest(req: Request, res: Response) {
  const { id } = req.params;
  const { status } = req.body;
  try {
    await handleRoleRequest(Number(id), status);
    res.status(200).send({ message: `Função Reqquisitada ${status}` });
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
}