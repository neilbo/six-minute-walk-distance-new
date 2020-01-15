import { NgModule } from "@angular/core";
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ValidationErrorComponent } from './validation-error/validation-error.component';
import { ImperialFormComponent } from './imperial-form/imperial-form.component';
import { MetricFormComponent } from './metric-form/metric-form.component';

@NgModule({
    imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
    declarations: [ValidationErrorComponent, MetricFormComponent, ImperialFormComponent ],
    exports: [ValidationErrorComponent, MetricFormComponent, ImperialFormComponent ],
})

export class ComponentsModule{}