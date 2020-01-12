import { Component, ViewChild, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { ValidationService } from "../validation.service";
import isEmpty from "lodash/isEmpty";
import { CalculateDistanceService } from "../calculate-distance.service";
import { IonInput, ToastController } from "@ionic/angular";
import copyToClipboard from "../utils/copy-to-clipboard";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage implements OnInit {
  @ViewChild("height", { static: false }) height: IonInput;
  metricForm: FormGroup;
  constructor(
    public formBuilder: FormBuilder,
    public calculateDistance: CalculateDistanceService,
    public toastCtrl: ToastController
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

  ngOnInit() {
    this.focusOnInput();
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
    this.copyToClipboard(this.getDistance());
    this.focusOnInput();
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

  focusOnInput() {
    setTimeout(() => {
      if (this.height) {
        this.height.setFocus();
      }
    }, 2000);
  }

  copyToClipboard(val: any) {
    copyToClipboard(val);
    this.presentCopiedToast(val);
  }

  async presentCopiedToast(val?: any): Promise<void> {
    const toast = await this.toastCtrl.create({
      message: `  <ion-icon name="copy"></ion-icon> Copied ${val} to Clipboard!`,
      duration: 2500,
      cssClass: "toast-default",
      position: `middle`
    });
    toast.present();
  }
}
