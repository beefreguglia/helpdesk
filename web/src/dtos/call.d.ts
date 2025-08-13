type CallStatus = "OPEN" | "IN_PROGRESS" | "CLOSED" | "LATE";

type ServiceInCall = {
	title: string;
	price: number;
};

type CallService = {
	id: string;
	service: ServiceInCall;
};

type Call = {
	id: string;
	title: string;
	status: CallStatus;
	description: string;
	updatedAt: Date;
	client: {
		name: string;
	};
	technician: {
		name: string;
	};
	callServices: CallService[];
};

type CallDetails = {
	id: string;
	title: string;
	description: string;
	status: CallStatus;
	clientName: string;
	technicianName: string;
	technicianEmail: string;
	services: CallService[];
	createdAt: Date;
	updatedAt: Date;
};
