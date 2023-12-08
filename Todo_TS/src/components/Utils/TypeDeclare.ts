export type MainParamsType = {
  $target: HTMLElement | null;
};

export type HeaderParamsType = {
  $target: HTMLElement | null;
  text: string;
};

export type InputParamsType = {
  $target: HTMLElement | null;
  onSubmit: (text: string) => void;
};
