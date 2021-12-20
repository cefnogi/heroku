import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddMoneyToUwalletPage } from './add-money-to-uwallet.page';

describe('AddMoneyToUwalletPage', () => {
  let component: AddMoneyToUwalletPage;
  let fixture: ComponentFixture<AddMoneyToUwalletPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMoneyToUwalletPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddMoneyToUwalletPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
