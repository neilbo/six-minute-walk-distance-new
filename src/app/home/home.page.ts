import { Component } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ValidationService } from "../validation.service";
import isEmpty from "lodash/isEmpty";
import { CalculateDistanceService } from "../calculate-distance.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  metricForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public calculateDistance: CalculateDistanceService
  ) {
    this.metricForm = this.formBuilder.group({
      cm: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      kg: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      age: [
        "",
        [ValidationService.isRequired, ValidationService.isGreaterThan(1)]
      ],
      gender: ["", [ValidationService.isRequired]]
    });
    // this.onFormChange();
  }

  showResults() {
    return !this.isFormEmpty() ? this.showResults() : null;
  }

  getDistance() {
    return this.calculateDistance.enrightForumla(
      this.metricForm.controls.cm.value,
      this.metricForm.controls.kg.value,
      this.metricForm.controls.age.value,
      this.metricForm.controls.gender.value
    );
  }
  resetForm() {
    this.metricForm.reset();
  }

  onFormChange() {
    this.metricForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      if (this.metricForm.valid && this.metricForm.dirty) {
        this.getDistance();
      }
    });
  }

  isFormEmpty(): boolean {
    return (
      isEmpty(this.metricForm.controls.cm.value) ||
      isEmpty(this.metricForm.controls.age.value) ||
      isEmpty(this.metricForm.controls.kg.value) ||
      isEmpty(this.metricForm.controls.gender.value)
    );
  }
}
