import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConnectedAccountPage } from './connected-account.page';

describe('ConnectedAccountPage', () => {
  let component: ConnectedAccountPage;
  let fixture: ComponentFixture<ConnectedAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectedAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnectedAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
