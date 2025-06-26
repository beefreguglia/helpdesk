import { useNavigate } from "react-router";
import { Button } from "../button";
import { Icon } from "../icon";
import { Text } from "../text";

export function BackButton() {
	const navigate = useNavigate();

	function handleBack() {
		navigate(-1);
	}

	return (
		<Button
			size="none"
			variant="link"
			className="flex items-center gap-2"
			onClick={handleBack}
		>
			<Icon size="sm" iconName="ArrowLeft" />
			<Text variant="text-xs-bold">Voltar</Text>
		</Button>
	);
}
