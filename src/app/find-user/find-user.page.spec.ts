import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindUserPage } from './find-user.page';

describe('FindUserPage', () => {
  let component: FindUserPage;
  let fixture: ComponentFixture<FindUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
