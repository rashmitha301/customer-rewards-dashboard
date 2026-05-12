export const enrichDate = (d) => {
  const dt = new Date(d);
  return {
    month: dt.toLocaleString("default", { month: "long" }),
    year: dt.getFullYear(),
    sortKey: dt.getTime()
  };
};
export const getLast3MonthsRange = () => {
  const end = new Date();
  const start = new Date();
  start.setMonth(end.getMonth() - 3);
  return { start, end };
};
export const formatDate = (date) => {
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
};
