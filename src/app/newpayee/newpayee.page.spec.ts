import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewpayeePage } from './newpayee.page';

describe('NewpayeePage', () => {
  let component: NewpayeePage;
  let fixture: ComponentFixture<NewpayeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewpayeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewpayeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
