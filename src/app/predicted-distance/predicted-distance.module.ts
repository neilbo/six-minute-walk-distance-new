import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { PredictedDistancePageRoutingModule } from "./predicted-distance-routing.module";

import { PredictedDistancePage } from "./predicted-distance.page";
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PredictedDistancePageRoutingModule
  ],
  declarations: [PredictedDistancePage]
})
export class PredictedDistancePageModule {}
