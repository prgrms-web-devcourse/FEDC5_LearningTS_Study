// Write your types here! ✨
// 선택유형별로 나누어서 작성
// 1. step 에 따라 구분짓고 리터럴 유형으로 작성한다
// 2. status 에 따라 구분짓고 리터럴 유형으로 작성한다

type Common = {
  from: "plaintiff" | "defendant"; // 피고 원고
  reason: string;
};
type PreTrial = Common & {
  step: "pre-trial";
  classification: "suppress" | "dismiss" | "venue";
  // pre-post에 따른 구분
};
type PostTrial = Common & {
  step: "post-trial";
  classification: "acquittal" | "correction" | "new trial";
  // pre-post에 따른 구분
};

type TrialMotion = PreTrial | PostTrial;

// 아래는 상태에 따른 구분
type Allowed = TrialMotion & {
  status: "allowed";
  deliberationHours: number;
  // 허용
};

type Denied = TrialMotion & {
  status: "denied";
  deliberationHours: number;
  annoyedJustice: boolean;
  // 거부
};

type Pending = TrialMotion & {
  status: "pending";
  estimatedDeliberationHours: number;
  // 대기
};

type Motion = Allowed | Denied | Pending;

export const motions: Motion[] = [
  {
    annoyedJustice: true,
    classification: "acquittal",
    deliberationHours: 1,
    from: "defendant",
    reason: "The heretofore document had dried ink on it.",
    status: "denied",
    step: "post-trial",
  },
  {
    annoyedJustice: true,
    classification: "correction",
    deliberationHours: 2.5,
    from: "plaintiff",
    reason: "The tenant has ninety days to vacate.",
    status: "denied",
    step: "post-trial",
  },
  {
    classification: "suppress",
    deliberationHours: 4,
    from: "plaintiff",
    reason: "Frank was never allowed in the house.",
    status: "allowed",
    step: "pre-trial",
  },
  {
    classification: "new trial",
    estimatedDeliberationHours: 3,
    from: "defendant",
    reason: "The duel's been accepted. There's no backing out. That's the law.",
    status: "pending",
    step: "post-trial",
  },
  {
    annoyedJustice: false,
    classification: "dismiss",
    deliberationHours: 0.5,
    from: "plaintiff",
    reason:
      "It seems like you have a tenuous grasp on the English language in general.",
    status: "denied",
    step: "pre-trial",
  },
  {
    annoyedJustice: true,
    classification: "correction",
    deliberationHours: 1.5,
    from: "defendant",
    reason: "Fillibuster?",
    status: "denied",
    step: "post-trial",
  },
  {
    annoyedJustice: true,
    classification: "venue",
    deliberationHours: 0.25,
    from: "defendant",
    reason: "A time was never specified for the duel.",
    status: "denied",
    step: "pre-trial",
  },
  {
    annoyedJustice: true,
    classification: "correction",
    deliberationHours: 5,
    from: "plaintiff",
    reason: "He's making a few good points!",
    status: "denied",
    step: "post-trial",
  },
];
