import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ElectricitybillPage } from './electricitybill.page';

describe('ElectricitybillPage', () => {
  let component: ElectricitybillPage;
  let fixture: ComponentFixture<ElectricitybillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElectricitybillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ElectricitybillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
