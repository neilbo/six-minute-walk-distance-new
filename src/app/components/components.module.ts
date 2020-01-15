import { NgModule } from "@angular/core";
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MetricFormComponent } from './metric-form/metric-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
    declarations: [ValidationErrorComponent, MetricFormComponent, ],
    exports: [ValidationErrorComponent, MetricFormComponent],
})



export class ComponentsModule{}