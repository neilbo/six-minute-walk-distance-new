import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class ValidationService {
  constructor() { 
    
  }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any, validatorInstance?: any) {
    const config = {
      'required': `This is required`,
      'required_age': `Please enter an age`,
      'required_height_cm': `Please enter a height in cm`,
      'required_weight_lbs': `Please enter a weight in lbs`,
      'required_weight_kg': `Please enter a weight in kg`,
      'required_height_feet': `Please enter a height in feet`,
      'required_height_inch': `Please enter a height in inches`,
      'invalidCreditCard': 'Please enter valid credit card number',
      'invalidEmailAddress': 'Please enter a valid email address',
      'invalidPassword': 'Please enter a valid password. Password must be at least 6 characters long, and contain a number.',
      'invalid_age': 'Please enter a valid age',
      'invalidInches': 'Please enter a valid height in inches',
      'minlength': `Too short. Please enter at lease ${validatorValue.requiredLength} characters`
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static ageValidate(control) {
    const notWholeNumber = control.value % 1 !== 0;
    const tooOld = control.value > 120;
    const tooYoung = control.value < 1;
    const notANumber = isNaN(control.value);

    if (notWholeNumber || tooOld || tooYoung || notANumber) {
      return { 'invalid_age': true };
    } else {
      return null;
    }
  }

  static ageRequired(control) {
    const isEmpty = _.isEmpty(control.value);

    if (isEmpty) {
      return { 'required_age': true };
    }
    return null;
  }

  static cmRequired(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_height_cm': true };
    }
    return null;

  }

  static feetValidate(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_height_feet': true };
    }

  }
  static kgRequired(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_weight_kg': true };
    }
  }
  static lbsRequired(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_weight_lbs': true };
    }
  }

  static genderRequired(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_gender': true };
    }
  }

  static inchesRequired(control) {
    const isEmpty = _.isEmpty(control.value);
    if (isEmpty) {
      return { 'required_height_inch': true };
    }
    return null;

  }

  static inchesValidate(control) {
    const betweenZeroAndEleven = control.value >= 0 && control.value <= 11;
    const notANumber = isNaN(control.value);
    const notWholeNumber = control.value % 1 !== 0;
    if (notWholeNumber || !betweenZeroAndEleven || notANumber) {
      return { 'invalidInches': true };
    } else {
      return null;
    }

  }
}
