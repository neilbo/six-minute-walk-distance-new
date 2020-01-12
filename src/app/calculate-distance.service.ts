import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculateDistanceService {

  constructor() { }

  maleEnright(height, weight, age) {
    return ((7.57 * height) - (5.02 * age) - (1.76 * weight) - 309).toFixed(2);
  }

  femaleEnright(height, weight, age) {
    return ((2.11 * height) - (2.29 * weight) - (5.78 * age) + 667).toFixed(2);
  }

  enrightForumla(height, weight, age, gender) {
    console.log(height, weight, age, gender);
    try {
      if (gender == 'male') {
        return this.maleEnright(height, weight, age);
      } else {
        return this.femaleEnright(height, weight, age);
      }
    }
    catch(error) {
      console.error(`Calculate Service Error: ${error}`);
    }
    
  }
}
