import { PrismaClient, Role, RoleRequestStatus } from "@prisma/client";

const prisma = new PrismaClient();

export async function requestRoleChange(userId: number, role: Role) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user?.role === role) {
    throw new Error(`O usuário já é um ${role}`);
  }

  await prisma.roleRequest.create({
    data: {
      userId,
      role,
      status: "PENDING",
    },
  });
}

export async function getRoleRequests() {
  return await prisma.roleRequest.findMany({ where: { status: "PENDING" } });
}

export async function handleRoleRequest(
  requestId: number,
  status: RoleRequestStatus
) {
  const roleRequest = await prisma.roleRequest.findUnique({
    where: { id: requestId },
  });

  if (!roleRequest || roleRequest.status !== "PENDING") {
    throw new Error("Solicitação inválida ou já processada");
  }

  if (status === RoleRequestStatus.ACCEPTED) {
    await prisma.user.update({
      where: { id: roleRequest.userId },
      data: { role: roleRequest.role },
    });
  }

  await prisma.roleRequest.update({
    where: { id: requestId },
    data: { status },
  });
}