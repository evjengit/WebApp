export function parseDateFromString(dateString: string | null): Date | null {
    if (!dateString || dateString.trim() === '') {
        return null;
    }
    
    const parsedDate = new Date(dateString);

    if (isNaN(parsedDate.getTime())) {
        return null;
    }

    return parsedDate;
}