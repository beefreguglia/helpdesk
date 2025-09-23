import type { UserRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";

import { AppError } from "@/utils/AppError";

function verifyUserAuthorization(role: UserRole[]) {
	return (request: Request, _: Response, next: NextFunction) => {
		if (!request.user || !role.includes(request.user.role)) {
			throw new AppError("Usuário não autorizado", 401);
		}

		return next();
	};
}

export { verifyUserAuthorization };
