import { convertNumToTimeString, convertSecToMinString } from "../helpers";

describe("convertNumToTimeString", () => {
  test("converts 65 seconds to '01:05'", () => {
    expect(convertNumToTimeString(65)).toBe("01:05");
  });

  test("converts 5 seconds to '00:05'", () => {
    expect(convertNumToTimeString(5)).toBe("00:05");
  });
});

describe("convertSecToMinString", () => {
  test("convert seconds less than an hour correctly'", () => {
    expect(convertSecToMinString(45 * 60)).toBe("45 mins");
    expect(convertSecToMinString(60)).toBe("1 min");
    expect(convertSecToMinString(5*60)).toBe("5 mins");
  })

  test("convert seconds more than an hour correctly", () =>{
    expect(convertSecToMinString(60*60)).toBe("1 hour");
    expect(convertSecToMinString(75*60)).toBe("1 hour 15 mins");
    expect(convertSecToMinString(61*60)).toBe("1 hour 1 min");
    expect(convertSecToMinString(120*60)).toBe("2 hours");
    expect(convertSecToMinString(121*60)).toBe("2 hours 1 min");
    expect(convertSecToMinString(122*60)).toBe("2 hours 2 mins");
  })
})