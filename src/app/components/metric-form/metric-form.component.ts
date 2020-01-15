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
  selector: "metric-form",
  templateUrl: "./metric-form.component.html",
  styleUrls: ["./metric-form.component.scss"]
})
export class MetricFormComponent implements OnInit {
  @ViewChild("height", { static: false }) height: IonInput;
  metricForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public calculateDistance: CalculateDistanceService,
    public toastService: ToastService
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
  }

  ngOnInit(): void {
    this.focusOnInput();
  }

  getDistance(): number {
    return +this.calculateDistance.enrightForumla(
      this.metricForm.controls.cm.value,
      this.metricForm.controls.kg.value,
      +this.metricForm.controls.age.value,
      this.metricForm.controls.gender.value
    );
  }

  displayResult(): string {
    return `${this.getDistance()}m`;
  }

  onFormChange(): void {
    try {
      this.metricForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        if (this.metricForm.valid && this.metricForm.dirty) {
          this.getDistance();
        }
      });
    } catch (error) {
      console.error(`Error getDistance ${error}`);
    }
  }

  isFormEmpty(): boolean {
    return (
      isEmpty(this.metricForm.controls.cm.value) ||
      isEmpty(this.metricForm.controls.age.value) ||
      isEmpty(this.metricForm.controls.kg.value) ||
      isEmpty(this.metricForm.controls.gender.value)
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
    this.metricForm.reset();
    this.focusOnInput();
  }

  showResults(): boolean {
    return !this.isFormEmpty() && this.metricForm.valid;
  }

  isNegativeDistance(): boolean {
    return Math.sign(this.getDistance()) === -1;
  }
}
