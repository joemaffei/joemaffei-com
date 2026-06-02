const monthYearFormat = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export function getPrevMonthDate(year: number, monthName: string): Date {
  const monthIndex = months.indexOf(monthName);
  return new Date(year, monthIndex - 1, 1);
}

export function getNextMonthDate(year: number, monthName: string): Date {
  const monthIndex = months.indexOf(monthName);
  return new Date(year, monthIndex + 1, 1);
}

export function getPrevMonthLabel(year: number, monthName: string): string {
  return monthYearFormat.format(getPrevMonthDate(year, monthName));
}

export function getNextMonthLabel(year: number, monthName: string): string {
  return monthYearFormat.format(getNextMonthDate(year, monthName));
}
