export function proper(str: string) {
  return str.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function pluralize(str: string) {
  var pluralizer = require("pluralize");
  return pluralizer(str);
}

export function generateRandomKey(length = 8): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export function formatDateYMD(date: any) {
  const isoDate = new Date(date);

  // Convert to Asia/Manila timezone using Intl.DateTimeFormat
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: process.env.NEXT_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(isoDate); // en-CA returns YYYY-MM-DD by default
}

export function flattenObject(obj: any, parentKey = "", result: any = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = parentKey ? `${parentKey}_${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      flattenObject(value, newKey, result);
    } else {
      result[newKey] = value;
    }
  }
  return result;
}
