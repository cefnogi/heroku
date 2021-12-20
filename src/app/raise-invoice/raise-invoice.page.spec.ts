import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RaiseInvoicePage } from './raise-invoice.page';

describe('RaiseInvoicePage', () => {
  let component: RaiseInvoicePage;
  let fixture: ComponentFixture<RaiseInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RaiseInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
