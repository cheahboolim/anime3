// receive a number of days and returns the unix timestamp 
export function convertToUnix(days: number) {

    if (days != 1) {
        const timestamp = Date.parse(new Date(Date.now() - days * 24 * 60 * 60 * 1000) as any) / 1000;

        return timestamp
    }

    // if days is 1 its meant to unix be as today
    const date = new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 0, 1, 0))
    const timestamp = Math.floor(date.getTime() / 1000)

    return timestamp
}

// receive a unix timestamp and converts to date 
export function convertFromUnix(
    unixTimestamp: number,
    options?: { month?: "numeric" | "2-digit" | "long" | "short" | "narrow" | undefined, year?: "numeric" | undefined, hour?: "2-digit" | undefined, minute?: "2-digit" | undefined }
) {

    const date = new Date(unixTimestamp * 1000)

    return date.toLocaleDateString(
        'en-US',
        {
            month: options ? options.month : 'long',
            day: "numeric",
            year: options ? options.year : "numeric",
            hour12: false,
            hour: options ? options.hour : "2-digit",
            minute: options ? options.minute : "2-digit"
        }
    )

}

// Current Date in Unix
export function getCurrentUnixDate() {

    return Number((new Date().getTime() / 1000).toFixed(0))

}

// get last minutes and seconds of this day (today) and returns the unix timestamp
export function lastHourOfTheDay(days: number) {

    const date = new Date(Date.UTC(
        new Date().getFullYear(), new Date().getMonth(),
        days == 1 ? new Date().getDate() : new Date().getDate() - days, 23, 59, 59
    ))

    const inUnix = Math.floor(date.getTime() / 1000)

    return inUnix

}