import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BroadbandbillPage } from './broadbandbill.page';

describe('BroadbandbillPage', () => {
  let component: BroadbandbillPage;
  let fixture: ComponentFixture<BroadbandbillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadbandbillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BroadbandbillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
