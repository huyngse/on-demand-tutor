export const meetLinkPattern = /^https:\/\/meet\.google\.com\/[a-zA-Z0-9-]+$/;

export function isGoogleMeetLink(input: string): boolean {
    return meetLinkPattern.test(input);
}