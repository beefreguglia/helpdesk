import { Trash2, Upload as UploadIcon } from "lucide-react";
import { type ChangeEvent, useRef } from "react";
import { Avatar } from "../avatar";
import { Button } from "../button";

type UploadProps = {
	fileName?: string;
	name: string;
	onFileChange: (file: File) => void;
	onDelete: () => void;
	isLoading?: boolean;
	className?: string;
};

export function Upload({
	fileName,
	name,
	onFileChange,
	onDelete,
	isLoading = false,
	className,
}: UploadProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleUploadClick() {
		fileInputRef.current?.click();
	}

	function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
		const file = event.target.files?.[0];
		if (file) {
			onFileChange(file);
		}
	}

	const containerClasses = `flex items-center gap-4 ${className || ""}`.trim();

	return (
		<div className={containerClasses}>
			<Avatar fileName={fileName} name={name} size="lg" />

			<div className="flex items-center gap-2">
				<Button
					variant="secondary"
					onClick={handleUploadClick}
					isLoading={isLoading}
					size="sm"
				>
					<div className="flex items-center gap-2">
						<UploadIcon size={20} />
						<span>Nova imagem</span>
					</div>
				</Button>

				<Button
					variant="secondary"
					size="icon-sm"
					onClick={onDelete}
					disabled={isLoading}
					aria-label="Deletar imagem"
				>
					<Trash2 size={20} className="text-feedback-open" />
				</Button>
			</div>

			<input
				type="file"
				ref={fileInputRef}
				onChange={handleFileSelect}
				className="hidden"
				accept="image/png, image/jpeg, image/webp"
			/>
		</div>
	);
}
