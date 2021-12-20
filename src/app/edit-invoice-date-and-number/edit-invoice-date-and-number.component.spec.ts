import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditInvoiceDateAndNumberComponent } from './edit-invoice-date-and-number.component';

describe('EditInvoiceDateAndNumberComponent', () => {
  let component: EditInvoiceDateAndNumberComponent;
  let fixture: ComponentFixture<EditInvoiceDateAndNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInvoiceDateAndNumberComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditInvoiceDateAndNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
