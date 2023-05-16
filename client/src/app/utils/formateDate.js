// function to convert unix time to date string
export function formatDate(dateString) {
	return new Date(dateString * 1000).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
	});
}
