import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PayTransferMoneyPage } from './pay-transfer-money.page';

describe('PayTransferMoneyPage', () => {
  let component: PayTransferMoneyPage;
  let fixture: ComponentFixture<PayTransferMoneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayTransferMoneyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PayTransferMoneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
