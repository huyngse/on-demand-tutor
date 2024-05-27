export function formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
}

export function dateToString(date: any) {
    return `${date.$y}-${date.$M + 1}-${date.$D}`;
}