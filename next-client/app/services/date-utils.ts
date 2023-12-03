export function getDate(date = new Date()) {
  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  const withSlashes = [year, month, day].join("/");

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
