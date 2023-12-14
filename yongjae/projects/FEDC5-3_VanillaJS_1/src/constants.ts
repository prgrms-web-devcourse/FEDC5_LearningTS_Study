export const STORAGE_KEY = "todos";

const KNOWN_ERROR_MESSAGES = {
  invalidState: "올바르지 않은 상태 형식입니다",
};

export const ERROR_MESSAGES = new Proxy(KNOWN_ERROR_MESSAGES, {
  get: function (target: { [key: string]: string }, prop: string) {
    if (prop.length < 1) {
      return "알 수 없는 에러입니다.";
    }
    return target[prop] ?? prop;
  },
});
