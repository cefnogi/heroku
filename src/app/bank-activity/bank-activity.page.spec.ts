import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BankActivityPage } from './bank-activity.page';

describe('BankActivityPage', () => {
  let component: BankActivityPage;
  let fixture: ComponentFixture<BankActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BankActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BankActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
