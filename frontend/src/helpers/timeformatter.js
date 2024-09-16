export function convertTimestamp(timestamp) {
    // Parse the timestamp
    const date = new Date(timestamp);

    // Define options for formatting
    const options = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    // Format the date
    const formattedDate = date.toLocaleString('en-US', options);

    // Replace comma after the day with a period
    const formattedWithPeriod = formattedDate.replace(',', '.');

    return formattedWithPeriod;
}

export function timeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);

    // Ensure that 'past' is a valid date
    if (isNaN(past.getTime())) {
        return "Invalid date";
    }

    const diffInSeconds = Math.floor((now - past) / 1000);

    // Check if the difference is a valid finite number
    if (!isFinite(diffInSeconds)) {
        return "Invalid time difference";
    }

    const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    // Time intervals in seconds
    const intervals = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    for (const unit in intervals) {
        const diff = Math.floor(diffInSeconds / intervals[unit]);
        if (diff !== 0) {
            return `Last Read: ${formatter.format(-diff, unit)}`;
        }
    }

    return "Last Read: Just now";
}