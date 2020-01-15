import { Component, ViewChild, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ValidationService } from "../../validation.service";
import isEmpty from "lodash/isEmpty";
import { CalculateDistanceService } from "../../calculate-distance.service";
import { IonInput } from "@ionic/angular";
import copyToClipboard from "../../utils/copy-to-clipboard";
import { ToastService } from "src/app/toast.service";

@Component({
  selector: "imperial-form",
  templateUrl: "./imperial-form.component.html",
  styleUrls: ["./imperial-form.component.scss"]
})
export class ImperialFormComponent implements OnInit {
  @ViewChild("height", { static: false }) height: IonInput;
  imperialForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public calculateDistance: CalculateDistanceService,
    public toastService: ToastService
  ) {
    this.imperialForm = this.formBuilder.group({
      feet: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      inches: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
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
    this.focusOnInput();
  }

  getDistance(): number {
    return +this.calculateDistance.enrightForumla(
      this.imperialForm.controls.feet.value,
      this.imperialForm.controls.lbs.value,
      this.imperialForm.controls.age.value,
      this.imperialForm.controls.gender.value
    );
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
