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
  @Input() fieldName: string;

  constructor() { }

  ngOnInit() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (
        this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched
      ) {
        let message = ValidationService.getValidatorErrorMessage(
          propertyName,
          this.fieldName,
          this.control.errors[propertyName],
        );
        return `${message}`
      }
    }
    return null;
  }

}
