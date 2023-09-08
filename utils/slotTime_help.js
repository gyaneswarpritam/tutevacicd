import * as RNLocalize from "react-native-localize";

export function convertToMinutes(time) {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
}

export function sortTimes(times) {
    return times.slice().sort((a, b) => convertToMinutes(a) - convertToMinutes(b));
}

export function addMinutesAndFormat(times, min) {
    times = sortTimes(times);
    const result = [];
    const timeZone = RNLocalize.getTimeZone();
    for (const time of times) {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(hours);
        date.setMinutes(minutes);

        const newDate = new Date(date.getTime() + min * 60000); // Adding 30 minutes in milliseconds

        const formatter = new Intl.DateTimeFormat('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
            timeZone
        });

        const formattedStartTime = formatter.format(date);
        const formattedEndTime = formatter.format(newDate);

        result.push(`${formattedStartTime} - ${formattedEndTime}`);
    }
    return result.join(', ');
}

export function addMinutesAndFormatString(time, min) {
    const timeZone = RNLocalize.getTimeZone();
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);

    const newDate = new Date(date.getTime() + min * 60000); // Adding 30 minutes in milliseconds

    const formatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone
    });

    const formattedStartTime = formatter.format(date);
    const formattedEndTime = formatter.format(newDate);

    const formattedResult = `${formattedStartTime} - ${formattedEndTime}`;
    return formattedResult;
}