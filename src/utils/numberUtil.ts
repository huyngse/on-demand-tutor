export function formatNumberWithCommas(num: number): string {
    // Convert the number to a string
    const numStr = num.toString();

    // Use a regular expression to insert commas
    const formattedStr = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formattedStr;
}