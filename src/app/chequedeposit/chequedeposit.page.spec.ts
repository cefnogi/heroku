import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChequedepositPage } from './chequedeposit.page';

describe('ChequedepositPage', () => {
  let component: ChequedepositPage;
  let fixture: ComponentFixture<ChequedepositPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequedepositPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChequedepositPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
