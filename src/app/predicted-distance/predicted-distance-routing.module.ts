import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredictedDistancePage } from './predicted-distance.page';

const routes: Routes = [
  {
    path: '',
    component: PredictedDistancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredictedDistancePageRoutingModule {}
