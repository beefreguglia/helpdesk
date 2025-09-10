import { UsersAvatarController } from "@/controllers/users-avatar-controller";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { Router } from "express";

const usersAvatarRoutes = Router();
const usersAvatarController = new UsersAvatarController();

usersAvatarRoutes.patch(
  "/update",
  verifyUserAuthorization(["ADMIN", "CLIENT", "TECHNICIAN"]),
  usersAvatarController.updateAvatar,
);

export { usersAvatarRoutes };
