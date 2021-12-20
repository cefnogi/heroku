import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GasconnectionbillPage } from './gasconnectionbill.page';

describe('GasconnectionbillPage', () => {
  let component: GasconnectionbillPage;
  let fixture: ComponentFixture<GasconnectionbillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GasconnectionbillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GasconnectionbillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
