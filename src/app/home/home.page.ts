import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  metricForm: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.metricForm = this.formBuilder.group({
      cm: ['', ValidationService.cmRequired],
      kg: ['', ValidationService.kgRequired],
      age: ['', [ValidationService.ageRequired, ValidationService.ageValidate]],
      gender: ['', ValidationService.genderRequired]
    });

    this.onFormChange();

  }

  showResults() {
    console.info(`show`);
    // calculate
    // show reset button
  }
  hideResults() {
    console.info(`hide`);
    // calculate
    // show reset button
  }
  resetForm() {
    this.metricForm.reset()

  }

  onFormChange() {
    this.metricForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => {
        if (this.metricForm.valid && this.metricForm.dirty) {
          this.showResults();
        } else {
          this.hideResults();
        }
      });
  }

}
