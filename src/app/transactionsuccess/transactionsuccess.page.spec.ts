import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransactionsuccessPage } from './transactionsuccess.page';

describe('TransactionsuccessPage', () => {
  let component: TransactionsuccessPage;
  let fixture: ComponentFixture<TransactionsuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionsuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
