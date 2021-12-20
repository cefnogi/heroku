import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferToBankAccountPage } from './transfer-to-bank-account.page';

describe('TransferToBankAccountPage', () => {
  let component: TransferToBankAccountPage;
  let fixture: ComponentFixture<TransferToBankAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferToBankAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferToBankAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
