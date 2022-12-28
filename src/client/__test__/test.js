import { handleSubmit } from "../js/formHandler";
import { checkInput } from "../js/nameChecker";
describe("nameChecker.js", () => {
  test("should return false when input empty", () => {
    expect(checkInput("")).toBe(false);
  });
  test("should return true when input empty", () => {
    expect(checkInput("has value")).toBe(true);
  });
});

describe("formHandler.js", () => {
  test("alert show when input empty", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    handleSubmit("");
    expect(window.alert).toBeCalled();
  });
});
