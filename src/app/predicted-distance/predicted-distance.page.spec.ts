import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PredictedDistancePage } from './predicted-distance.page';

describe('PredictedDistancePage', () => {
  let component: PredictedDistancePage;
  let fixture: ComponentFixture<PredictedDistancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PredictedDistancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PredictedDistancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
