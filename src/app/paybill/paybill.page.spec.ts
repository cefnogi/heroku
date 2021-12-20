import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaybillPage } from './paybill.page';

describe('PaybillPage', () => {
  let component: PaybillPage;
  let fixture: ComponentFixture<PaybillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaybillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaybillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
