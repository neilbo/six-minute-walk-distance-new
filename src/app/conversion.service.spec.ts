import { TestBed } from "@angular/core/testing";

import { ConversionService } from "./conversion.service";

describe("ConversionService", () => {
  const service: ConversionService = TestBed.get(ConversionService);
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should convert feet to inches", () => {
    expect(service.feetToInches(1)).toBe(12);
  });

  it("should convert inches to cm", () => {
    expect(service.inchesToCentimetres(1)).toBe(2.54);
  });

  it("should convert lbs to kgs", () => {
    expect(service.lbsToKg(210)).toBe(95.25);
  });

  it("should convert metres to inches", () => {
    expect(service.metresToInches(1)).toBe(39.37);
  });
});
