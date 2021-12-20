import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DthbillPage } from './dthbill.page';

describe('DthbillPage', () => {
  let component: DthbillPage;
  let fixture: ComponentFixture<DthbillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DthbillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DthbillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
