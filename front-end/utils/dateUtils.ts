function formatDateStringToEuropean(dateStr: string | undefined): string {
    // Parse the date string to a Date object
    const date = new Date(dateStr);

    // Check if the date is valid
    if (isNaN(date.getTime())) {
        throw new Error("Invalid date string provided");
    }

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Return the date in dd/mm/yyyy format
    return `${day}/${month}/${year}`;
}


const DateUtils = {
    formatDateStringToEuropean,
}

export default DateUtils;