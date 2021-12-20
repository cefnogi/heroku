import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MoneytransferPage } from './moneytransfer.page';

describe('MoneytransferPage', () => {
  let component: MoneytransferPage;
  let fixture: ComponentFixture<MoneytransferPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoneytransferPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MoneytransferPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
