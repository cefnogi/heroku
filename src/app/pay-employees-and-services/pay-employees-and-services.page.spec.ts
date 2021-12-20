import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayEmployeesAndServicesPage } from './pay-employees-and-services.page';

describe('PayEmployeesAndServicesPage', () => {
  let component: PayEmployeesAndServicesPage;
  let fixture: ComponentFixture<PayEmployeesAndServicesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayEmployeesAndServicesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayEmployeesAndServicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
