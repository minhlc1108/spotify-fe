export function formatSecondsToMinutes(seconds: number | undefined): string {
	if (!seconds) seconds = 0;
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const paddedSecs = secs < 10 ? `0${secs}` : secs;
	return `${mins}:${paddedSecs}`;
}
