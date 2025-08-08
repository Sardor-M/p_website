export type DateFormatStyle = 'numeric' | '2-digit' | 'long' | 'short' | 'narrow';

export type DateFormatOptions = {
    locale?: string;
    style?: DateFormatStyle;
    includeTime?: boolean;
    timeStyle?: DateFormatStyle;
};

export const formatDate = (dateString: string, options: DateFormatOptions = {}): string => {
    try {
        const {
            locale = 'en-US',
            style = 'long',
            includeTime = false,
            timeStyle = 'short',
        } = options;

        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string provided');
        }

        const formatOptions: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: style,
            day: 'numeric',
            ...(includeTime && {
                hour: timeStyle === 'short' ? '2-digit' : 'numeric',
                minute: timeStyle === 'short' ? '2-digit' : 'numeric',
                hour12: true,
            }),
        };

        return date.toLocaleDateString(locale, formatOptions);
    } catch (error) {
        console.error('Error formatting date:', error);
        return dateString;
    }
};
