import moment from "moment";

export const calculateDateDiff = (start, end) => {
  const a = moment(end);
  const b = moment(start);

  const years = a.diff(b, "year");
  b.add(years, "years");

  const months = a.diff(b, "months");
  b.add(months, "months");

  const days = a.diff(b, "days");
  const datesSing = ["year", "month", "day"];
  const datePlur = ["years", "months", "days"];
  const arr = [years, months, days];
  return arr
    .map((item, i) => (item > 1 ? `${item} ${datePlur[i]}` : item === 1 ? `${item} ${datesSing[i]}` : ""))
    .filter((item) => item)
    .toString()
    .replaceAll(",", ", ");
};
