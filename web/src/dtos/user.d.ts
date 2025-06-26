type UserApiRole = "ADMIN" | "CLIENT" | "TECHNICIAN";

type UserApiResponse = {
	token: string;
	user: {
		id: string;
		name: string;
		email: string;
		role: UserApiRole;
	};
};
