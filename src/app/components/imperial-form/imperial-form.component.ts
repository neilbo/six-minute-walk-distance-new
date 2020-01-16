import { Component, ViewChild, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ValidationService } from "../../validation.service";
import isEmpty from "lodash/isEmpty";
import { CalculateDistanceService } from "../../calculate-distance.service";
import { IonInput } from "@ionic/angular";
import copyToClipboard from "../../utils/copy-to-clipboard";
import { ToastService } from "src/app/toast.service";
import toNumber from "lodash/toNumber";
import { ConversionService } from "src/app/conversion.service";

@Component({
  selector: "imperial-form",
  templateUrl: "./imperial-form.component.html",
  styleUrls: ["./imperial-form.component.scss"]
})
export class ImperialFormComponent implements OnInit {
  @ViewChild("height", { static: false }) height: IonInput;
  imperialForm: FormGroup;
  distanceInFeet: number;
  distanceInMiles: number;
  constructor(
    public formBuilder: FormBuilder,
    public calculateDistance: CalculateDistanceService,
    public toastService: ToastService,
    public convert: ConversionService
  ) {
    this.imperialForm = this.formBuilder.group({
      feet: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      inches: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(0), ValidationService.isLessThan(12)]
      ],
      lbs: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      age: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      gender: ["", [ValidationService.isRequired]]
    });
  }

  ngOnInit(): void {
    // this.focusOnInput();
  }

  getDistance(): number {
    let heightInInches =
      toNumber(
        this.convert.feetToInches(this.imperialForm.controls.feet.value)
      ) + toNumber(this.imperialForm.controls.inches.value);
    let heightInCm = this.convert.inchesToCentimetres(heightInInches);
    let weightKgs = this.convert.lbsToKg(this.imperialForm.controls.lbs.value);

    let distanceInMetres = +this.calculateDistance.enrightForumla(
      heightInCm,
      weightKgs,
      +this.imperialForm.controls.age.value,
      this.imperialForm.controls.gender.value
    );

    let distanceInInches = this.convert.metresToInches(distanceInMetres);
    this.distanceInFeet = this.convert.inchesToFeet(distanceInInches);
    this.distanceInMiles = this.convert.feetToMiles(this.distanceInFeet);

    return this.isResultAtLeastOneMile(this.distanceInFeet)
      ? this.distanceInMiles
      : this.distanceInFeet;
  }

  isResultAtLeastOneMile(feet: number): boolean {
    const oneMile = 5280;
    return feet >= oneMile;
  }

  displayResult(): string {
    return this.isResultAtLeastOneMile(this.distanceInFeet)
      ? `${this.distanceInMiles} miles`
      : `${this.distanceInFeet} feet`;
  }

  onFormChange(): void {
    try {
      this.imperialForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        if (this.imperialForm.valid && this.imperialForm.dirty) {
          this.getDistance();
        }
      });
    } catch (error) {
      console.error(`Error getDistance ${error}`);
    }
  }

  isFormEmpty(): boolean {
    return (
      isEmpty(this.imperialForm.controls.feet.value) ||
      isEmpty(this.imperialForm.controls.inches.value) ||
      isEmpty(this.imperialForm.controls.age.value) ||
      isEmpty(this.imperialForm.controls.lbs.value) ||
      isEmpty(this.imperialForm.controls.gender.value)
    );
  }

  focusOnInput(): void {
    setTimeout(() => {
      if (this.height) {
        this.height.setFocus();
      }
    }, 2000);
  }

  copyToClipboard(val: any) {
    copyToClipboard(val);
    this.toastService.presentCopiedToast(val);
    this.imperialForm.reset();
    this.focusOnInput();
  }

  showResults(): boolean {
    return !this.isFormEmpty() && this.imperialForm.valid;
  }

  isNegativeDistance(): boolean {
    return Math.sign(this.getDistance()) === -1;
  }
}
