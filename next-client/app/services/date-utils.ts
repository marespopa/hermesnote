export function getDate() {
  const date = new Date();

  const year = date.getFullYear();
  const month = padTo2Digits(date.getMonth() + 1);
  const day = padTo2Digits(date.getDate());

  const withSlashes = [year, month, day].join("/");

  return `[${withSlashes}]`;
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
