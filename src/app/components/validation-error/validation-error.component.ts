import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidationService } from 'src/app/validation.service';

@Component({
  selector: 'validation-error',
  template: `
  <ion-item  *ngIf="errorMessage !== null">
    <span class="form-error">{{errorMessage}}</span>
  </ion-item>`,
  styleUrls: ['./validation-error.component.scss'],
})
export class ValidationErrorComponent implements OnInit {
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() { }

  get errorMessage() {
    console.log('this.control', this.control);
    for (let propertyName in this.control.errors) {
      console.log('propertyName', propertyName);
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName], this.control);
      }
    }
    return null;
  }

}
