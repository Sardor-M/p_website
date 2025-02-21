export type DateFormatStyle =
  | "numeric"
  | "2-digit"
  | "long"
  | "short"
  | "narrow";

export interface DateFormatOptions {
  locale?: string;
  style?: DateFormatStyle;
  includeTime?: boolean;
  timeStyle?: DateFormatStyle;
}

export const formatDate = (
  dateString: string,
  options: DateFormatOptions = {}
): string => {
  try {
    const {
      locale = "en-US",
      style = "long",
      includeTime = false,
      timeStyle = "short",
    } = options;

    const date = new Date(dateString);

    //  we check if it is a valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string provided");
    }

    const formatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: style,
      day: "numeric",
      ...(includeTime && {
        hour: timeStyle === "short" ? "2-digit" : "numeric",
        minute: timeStyle === "short" ? "2-digit" : "numeric",
        hour12: true,
      }),
    };

    return date.toLocaleDateString(locale, formatOptions);
  } catch (error) {
    console.error("Error formatting date:", error);
    // we return the original string if the checks fail
    return dateString;
  }
};

// formatDate('2024-02-21')
//  | formatDate('2024-02-21T15:30:00', { includeTime: true }
//  | formatDate('2024-02-21', { locale: 'uz-UZ' })
//  | formatDate('2024-02-21', { style: 'short' })
// "February 21, 2024"
//  | "February 21, 2024, 3:30 PM"
//  | "21 fevral 2024"
//  | "2/21/2024"
