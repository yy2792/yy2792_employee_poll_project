import { _saveQuestion } from "../utils/_DATA";

describe("Test on _saveQuestion", () => {
  it("will return the saved question with all expected fields when correctly formatted data is passed", async () => {
    const q = {
      optionOneText: "opt1",
      optionTwoText: "opt2",
      author: "tylermcginnis",
    };
    const result = await _saveQuestion(q);
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("author");
    expect(result).toHaveProperty("timestamp");
    expect(result).toHaveProperty("optionOne");
    expect(result).toHaveProperty("optionTwo");
  });
});
