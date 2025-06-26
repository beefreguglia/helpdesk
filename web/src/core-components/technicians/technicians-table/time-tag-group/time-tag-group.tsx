import { TimeTag } from "@/components/time-tag";

type TimeTagGroupProps = {
	id: string;
	times: string[];
	maxWidth: number;
	tagWidth?: number;
};

export function TimeTagGroup({
	id,
	times,
	maxWidth,
	tagWidth = 60,
}: TimeTagGroupProps) {
	const maxVisible = Math.floor(maxWidth / tagWidth);
	const visibleTimes = times.slice(0, maxVisible);
	const hiddenCount = times.length - visibleTimes.length;

	return (
		<div style={{ maxWidth }}>
			<div className="flex items-center gap-2">
				{visibleTimes.map((time) => (
					<TimeTag variant="readOnly" key={`${time}-${id}`}>
						{time}
					</TimeTag>
				))}
				{hiddenCount > 0 && (
					<TimeTag variant="readOnly">+{hiddenCount}</TimeTag>
				)}
			</div>
		</div>
	);
}
