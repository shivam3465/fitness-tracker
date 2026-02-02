export function formatWorkoutDate(date: Date): string {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const target = new Date(date);
	target.setHours(0, 0, 0, 0);

	const diffDays =
		(target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

	if (diffDays === 0) return "Today";
	if (diffDays === -1) return "Yesterday";
	if (diffDays === 1) return "Tomorrow";

	return target.toLocaleDateString("en-IN", {
		weekday: "short",
		day: "2-digit",
		month: "short",
	});
}
