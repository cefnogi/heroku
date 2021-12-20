import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyLinkedAccountsPage } from './my-linked-accounts.page';

describe('MyLinkedAccountsPage', () => {
  let component: MyLinkedAccountsPage;
  let fixture: ComponentFixture<MyLinkedAccountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLinkedAccountsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyLinkedAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
