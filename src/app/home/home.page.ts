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
  title: string = `Predicted Distance`;
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

  ngOnInit(): void {
    this.focusOnInput();
  }

  getDistance(): number {
    return +this.calculateDistance.enrightForumla(
      this.metricForm.controls.cm.value,
      this.metricForm.controls.kg.value,
      this.metricForm.controls.age.value,
      this.metricForm.controls.gender.value
    );
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
    this.presentCopiedToast(val); 
    this.metricForm.reset();
    this.focusOnInput();
  }

  async presentCopiedToast(val?: any): Promise<void> {
    // TODO :: Put this in ToastService
    const toast = await this.toastCtrl.create({
      message: `  <ion-icon name="copy"></ion-icon> Copied <strong>${val}</strong> to Clipboard!`,
      duration: 2500,
      cssClass: "toast-default",
      position: `middle`
    });
    toast.present();
  }
}
