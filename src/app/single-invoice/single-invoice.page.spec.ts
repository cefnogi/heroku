import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleInvoicePage } from './single-invoice.page';

describe('SingleInvoicePage', () => {
  let component: SingleInvoicePage;
  let fixture: ComponentFixture<SingleInvoicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInvoicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleInvoicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
