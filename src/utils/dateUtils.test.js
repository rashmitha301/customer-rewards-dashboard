import { enrichDate, getLast3MonthsRange, formatDate } from "./dateUtils";

describe("dateUtils", () => {
  test("enrichDate should return month, year and sortKey", () => {
    const result = enrichDate("2024-03-15");

    expect(result).toEqual({
      month: "March",
      year: 2024,
      sortKey: new Date("2024-03-15").getTime()
    });
  });

  test("getLast3MonthsRange should return start and end dates", () => {
    const result = getLast3MonthsRange();

    expect(result.start).toBeInstanceOf(Date);
    expect(result.end).toBeInstanceOf(Date);
  });

  test("formatDate should return formatted date", () => {
    const result = formatDate(new Date("2024-03-15"));

    expect(result).toBe("2024-03-15");
  });
});
