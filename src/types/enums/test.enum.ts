export const TestEnum = {
  TEST: "TEST",
} as const;
export type TestEnum = (typeof TestEnum)[keyof typeof TestEnum];
