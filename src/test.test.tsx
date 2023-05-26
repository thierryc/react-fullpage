import { expect, describe, test } from "bun:test";

import {
  Fullpage,
  FullPageSections,
  FullpageSection,
  FullpageContext,
  FullpageNumber,
  FullpageCount,
  FullpageNavigation,
} from ".";

describe("Fullpage", () => {
  test("is truthy", () => {
    expect(Fullpage).toBeTruthy();
  });
});

describe("FullPageSections", () => {
  test("is truthy", () => {
    expect(FullPageSections).toBeTruthy();
  });
});

describe("FullpageSection", () => {
  test("is truthy", () => {
    expect(FullpageSection).toBeTruthy();
  });
});

describe("FullpageContext", () => {
  test("is truthy", () => {
    expect(FullpageContext).toBeTruthy();
  });
});

describe("FullpageCount", () => {
  test("is truthy", () => {
    expect(FullpageCount).toBeTruthy();
  });
});

describe("FullpageNumber", () => {
  test("is truthy", () => {
    expect(FullpageNumber).toBeTruthy();
  });
});

describe("FullpageNavigation", () => {
  test("is truthy", () => {
    expect(FullpageNavigation).toBeTruthy();
  });
});
