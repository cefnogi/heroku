import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DthdashboardPage } from './dthdashboard.page';

describe('DthdashboardPage', () => {
  let component: DthdashboardPage;
  let fixture: ComponentFixture<DthdashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DthdashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DthdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
