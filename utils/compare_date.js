/**
 * Compare two date strings and return the difference in a meaningful format.
 * @param {string} date1 - The first date string (ISO format).
 * @param {string} date2 - The second date string (ISO format).
 * @returns {Object} - An object containing the difference in days, hours, minutes, and seconds.
 */
export function compare_dates(date) {
  try {
    const d2 = new Date()
    const d1 = new Date(date ?? new Date())

    const differenceInMs = d1 - d2

    const diffInSeconds = Math.floor(differenceInMs / 1000)
    const diffInMinutes = Math.floor(diffInSeconds / 60)
    const diffInHours = Math.floor(diffInMinutes / 60)
    const diffInDays = Math.floor(diffInHours / 24)

    return {
      days: diffInDays,
      hours: diffInHours % 24,
      minutes: diffInMinutes % 60,
      seconds: diffInSeconds % 60,
    }
  } catch (e) {
    console.error("error in parsing date", e)
  }
}
