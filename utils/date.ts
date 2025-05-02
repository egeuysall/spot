const date = new Date();
export const year = date.getFullYear();

export const priceValidUntilString = date.toISOString().split("T")[0];

// Format current date for schema (ISO format)
export const currentDate = date.toISOString();
