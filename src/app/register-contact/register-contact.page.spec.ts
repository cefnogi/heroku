import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterContactPage } from './register-contact.page';

describe('RegisterContactPage', () => {
  let component: RegisterContactPage;
  let fixture: ComponentFixture<RegisterContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
