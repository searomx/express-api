import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Nenhum Token Fornecido!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (typeof decoded !== "string" && "id" in decoded) {
      res.locals.user = (decoded as JwtPayload).id;
      next();
    } else {
      res.status(401).json({ message: "Token Inválido!" });
    }
  } catch (error) {
    res.status(401).json({ message: "Token Inválido!" });
  }
};
