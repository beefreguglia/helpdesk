type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSED" | "LATE";

type CallService = {
	service: { title: string };
	priceAtTimeOfService: number;
};

type Call = {
	id: string;
	title: string;
	status: CallStatus;
	updatedAt: Date;
	client: {
		name: string;
	};
	technician: {
		name: string;
	};
	callServices: CallService[];
};
