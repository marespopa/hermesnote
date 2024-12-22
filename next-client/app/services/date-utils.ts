export function getDate(date = new Date(), separator = '/') {
  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  const withSlashes = [year, month, day].join(separator);

  return `${withSlashes}`;
}

export function getYear() {
  const date = new Date();
  const year = date.getFullYear();

  return year;
}

export function getMonth() {
  const date = new Date();
  const month = date.toLocaleString("default", { month: "long" });

  return month;
}

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

export function getFormattedTimeFromMs(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  const hoursString = hours > 0 ? `${padTo2Digits(hours)}h ` : "";

  return `${hoursString}${padTo2Digits(minutes)}m ${padTo2Digits(seconds)}s`;
}

export function getDatesOfCurrentWeek(separator = '/') {
  const currentDate = new Date();
  // Find the start of the week (Monday)
  const startOfWeek = new Date(
    currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)
  );

  // Generate the dates for the current week
  const dates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    dates.push(getDate(date, separator));
  }

  return dates;
}