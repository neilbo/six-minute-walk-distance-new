import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ConversionService {
  constructor() {}

  feetToInches(feet: number): number {
    return feet * 12;
  }

  cmToInches(cm: number): number {
    return cm * 0.3937;
  }

  inchesToCentimetres(inches: number): number {
    return inches * 2.54;
  }

  lbsToKg(lbs: number): number {
    return +(lbs * 0.453592).toFixed(2);
  }

  metresToInches(m: number): number {
    return +(m * 39.3701).toFixed(2);
  }

  inchesToFeet(inches: number): number {
    return +(+inches / 12).toFixed(2);
  }

  feetToMiles(feet: number): number {
    return +(feet / 0.000189394).toFixed(2);
  }
}
