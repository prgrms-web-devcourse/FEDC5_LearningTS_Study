import type { StateType } from "./TypeDeclare";

const validation = (state: StateType) => {
  state.map((check: { text: string; isCompleted: boolean }) => {
    if (!Object.keys(check).includes("text") || !Object.keys(check).includes("isCompleted")) {
      console.error(`잘못된 형식으로 저장된 값이 존재합니다!`);
    } else if (typeof check.text !== "string" || typeof check.isCompleted !== "boolean") {
      console.error(`${check.text}로 입력된 값이 이상합니다!`);
    }
  });
};

export { validation };
